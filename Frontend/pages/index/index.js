const app = getApp()
const HERB_DB = app.globalData.HERB_DB || {}

Page({
  data: {
    imagePath: '',
    result: '',
    confidence: 0,
    loading: false,
    showDetail: true,
    detail: null,
    networkStatus: '',
    showNotice: false,
    serverStatus: 'loading',
    hasShownNoticeInSession: false
  },

  onShow() {

    if (this.data.hasShownNoticeInSession) {
      this.setData({ showNotice: false })
      wx.showTabBar()
      this.wakeUpServer()
      return
    }


    let storedValue = wx.getStorageSync('showNotice')

    if (storedValue === undefined || storedValue === '') {
      storedValue = true
      wx.setStorageSync('showNotice', true) 
    }

    const shouldShow = storedValue

    if (shouldShow) {
      this.setData({
        showNotice: true,
        hasShownNoticeInSession: true
      })
      wx.hideTabBar()
    } else {
      this.setData({ showNotice: false })
      wx.showTabBar()
      this.wakeUpServer()
    }
  },

  closeNotice() {
    this.setData({
      showNotice: false,
      hasShownNoticeInSession: true
    })
    wx.showTabBar()
    this.wakeUpServer()
  },

  wakeUpServer(retryCount = 0) {
    const that = this
    if (retryCount >= 3) {
      this.setData({ serverStatus: 'error' })
      return
    }
    if (this.data.serverStatus === 'ready') return

    this.setData({ serverStatus: 'loading' })
    wx.cloud.callContainer({
      config: {
        env: 'prod-d3gwjmlm77e659517'
      },
      path: '/',
      method: 'GET',
      header: {
        'X-WX-SERVICE': 'flask-dc08'
      },
      timeout: 15000,
      success: (res) => {
        console.log('服务器连接成功', res)
        that.setData({ serverStatus: 'ready' })
      },
      fail: (err) => {
        console.log('服务器连接失败，第', retryCount + 1, '次重试', err)
        setTimeout(() => {
          that.wakeUpServer(retryCount + 1)
        }, 2000)
      }
    })
  },

  retryWakeUp() {
    this.wakeUpServer()
  },

  preventTouch() {
    return false
  },

  preventTap() {
    return false
  },

  stopPropagation() {
    // 阻止事件冒泡
  },

  copyLink() {
    wx.setClipboardData({
      data: 'https://aistudio.baidu.com/dataset/detail/246739/intro',
      success: () => {
        wx.showToast({
          title: '链接已复制',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },

  chooseImage() {
    if (this.data.loading) return
    if (this.data.serverStatus !== 'ready') {
      wx.showToast({
        title: '服务器未就绪，请稍候',
        icon: 'none'
      })
      return
    }

    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const path = res.tempFiles[0].tempFilePath
        this.setData({
          imagePath: path,
          result: '',
          confidence: 0,
          detail: null,
          showDetail: true
        })
        this.uploadImage(path)
      },
      fail: (err) => {
        console.log('选择图片失败：', err)
      }
    })
  },

  uploadImage(filePath) {
    const that = this
    this.setData({ loading: true, networkStatus: '⏳ 服务正在启动，请稍候...' })
    wx.showLoading({ title: '识别中...' })

    const fs = wx.getFileSystemManager()
    fs.readFile({
      filePath: filePath,
      success: (fileRes) => {
        console.log('[DEBUG] 文件大小：', fileRes.data.byteLength)
        if (fileRes.data.byteLength === 0) {
          wx.hideLoading()
          wx.showToast({ title: '图片文件为空', icon: 'none' })
          that.setData({ loading: false, networkStatus: '' })
          return
        }

        wx.cloud.callContainer({
          config: {
            env: 'prod-d3gwjmlm77e659517'
          },
          path: '/predict',
          method: 'POST',
          header: {
            'X-WX-SERVICE': 'flask-dc08',
            'content-type': 'application/json'
          },
          data: {
            image: wx.arrayBufferToBase64(fileRes.data)
          },
          success: (res) => {
            wx.hideLoading()
            that.setData({ networkStatus: '' })
            try {
              const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
              console.log('完整返回数据：', data)
              if (data.success) {
                const detail = HERB_DB[data.result_cn]
                if (detail) {
                  that.setData({
                    result: detail.name,
                    confidence: Math.round(data.confidence * 100),
                    detail: detail,
                    showDetail: true
                  })
                  that.saveToHistory(detail.name, Math.round(data.confidence * 100), that.data.imagePath)
                  wx.showToast({
                    title: '识别为：' + detail.name,
                    icon: 'success'
                  })
                } else {
                  that.setData({
                    result: '未收录草植',
                    confidence: Math.round(data.confidence * 100),
                    detail: null,
                    showDetail: false
                  })
                  wx.showModal({
                    title: '提示',
                    content: '当前草植不在模型训练范围之内',
                    showCancel: false,
                    confirmText: '知道了'
                  })
                }
              } else {
                wx.showToast({
                  title: data.error || '识别失败',
                  icon: 'none'
                })
              }
            } catch (e) {
              console.log('解析失败：', e)
              wx.showToast({
                title: '数据解析失败',
                icon: 'none'
              })
            }
          },
          fail: (err) => {
            wx.hideLoading()
            that.setData({ networkStatus: '' })
            console.log('请求失败：', err)
            if (err.errMsg && err.errMsg.includes('timeout')) {
              wx.showToast({
                title: '服务启动中，请稍后重试',
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '该草植未收录在训练模型中或识别失败，请更换图片或者联系开发者\n 请注意\n目前版本只能识别单张单个草植图片',
                showCancel: false,
                confirmText: '知道了'
              })
            }
          },
          complete: () => {
            that.setData({ loading: false })
          }
        })
      },
      fail: (err) => {
        wx.hideLoading()
        that.setData({ loading: false, networkStatus: '' })
        console.log('文件读取失败：', err)
        wx.showToast({
          title: '图片读取失败，请重试',
          icon: 'none'
        })
      }
    })
  },

  toggleDetail() {
    this.setData({
      showDetail: !this.data.showDetail
    })
  },

  saveToHistory(name, confidence, imagePath) {
    const history = wx.getStorageSync('history') || []
    history.unshift({
      name: name,
      confidence: confidence,
      imagePath: imagePath,
      time: new Date().toLocaleString()
    })
    if (history.length > 50) history.pop()
    wx.setStorageSync('history', history)
  }
})