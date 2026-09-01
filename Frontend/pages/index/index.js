const app = getApp()
const HERB_DB = app.globalData.HERB_DB || {}

Page({
  data: {
    pageAnimate: true,
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
    this.setData({ pageAnimate: false }, () => {
      setTimeout(() => {
        this.setData({ pageAnimate: true })
      }, 20)
    })

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

  stopPropagation() {},

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

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const path = res.tempFilePaths[0]
        console.log('选图路径:', path)

        this.setData({
          imagePath: path,
          result: '',
          confidence: 0,
          detail: null,
          showDetail: true
        })

        const fs = wx.getFileSystemManager()
        fs.readFile({
          filePath: path,
          success: (fileRes) => {
            const base64 = wx.arrayBufferToBase64(fileRes.data)
            this.recognizeWithBase64(base64, path)
          },
          fail: (err) => {
            console.log('读取图片失败：', err)
            wx.showToast({ title: '图片读取失败，请重试', icon: 'none' })
          }
        })
      },
      fail: (err) => {
        console.log('选择图片失败：', err)
        wx.showToast({ title: '选择图片失败，请重试', icon: 'none' })
      }
    })
  },

  recognizeWithBase64(base64, filePath) {
    const that = this
    this.setData({ loading: true, networkStatus: '⏳ 服务正在启动，请稍候...' })
    wx.showLoading({ title: '识别中...' })

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
        image: base64
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
              const fs = wx.getFileSystemManager()
              fs.saveFile({
                tempFilePath: filePath,
                success: (saveRes) => {
                  const savedPath = saveRes.savedFilePath
                  console.log('永久图片路径:', savedPath)
                  that.saveToHistory(detail.name, Math.round(data.confidence * 100), savedPath)
                  that.updateHerbarium(detail.name, savedPath, Math.round(data.confidence * 100))
                  that.setData({ imagePath: savedPath })
                },
                fail: (err) => {
                  console.log('保存永久图片失败，使用临时路径:', err)
                  that.saveToHistory(detail.name, Math.round(data.confidence * 100), filePath)
                  that.updateHerbarium(detail.name, filePath, Math.round(data.confidence * 100))
                }
              })
              wx.showToast({ title: '识别为：' + detail.name, icon: 'success' })
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
            wx.showToast({ title: data.error || '识别失败', icon: 'none' })
          }
        } catch (e) {
          console.log('解析失败：', e)
          wx.showToast({ title: '数据解析失败', icon: 'none' })
        }
        that.setData({ loading: false })
      },
      fail: (err) => {
        wx.hideLoading()
        that.setData({ loading: false, networkStatus: '' })
        console.log('请求失败：', err)
        if (err.errMsg && err.errMsg.includes('timeout')) {
          wx.showToast({ title: '服务启动中，请稍后重试', icon: 'none', duration: 2000 })
        } else {
          wx.showModal({
            title: '提示',
            content: '该草植未收录在训练模型中或识别失败，请更换图片或者联系开发者\n\n⚠️ 请注意：\n目前版本只能识别单张单个草植图片',
            showCancel: false,
            confirmText: '知道了'
          })
        }
      }
    })
  },

  updateHerbarium(herbName, imagePath, confidence) {
    let herbariumData = wx.getStorageSync('herbariumData') || {}
    if (!herbariumData[herbName] || !herbariumData[herbName].discovered) {
      herbariumData[herbName] = {
        discovered: true,
        image: imagePath,
        discoveredTime: new Date().toLocaleString(),
        confidence: confidence
      }
      wx.setStorageSync('herbariumData', herbariumData)
      console.log('图鉴已更新:', herbName)
    }
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