const app = getApp()
const HERB_DB = app.globalData.HERB_DB || {}

Page({
  data: {
    pageAnimate: true,
    imagePath: '',
    name: '',
    confidence: 0,
    time: '',
    scientific: '暂无数据',
    taste: '暂无数据',
    meridian: '暂无数据',
    efficacy: '暂无数据',
    indications: '暂无数据',
    caution: '暂无数据',
    mode: 'history',
    discovered: false,
    discoveredTime: ''
  },

  onLoad(options) {

    this.setData({ pageAnimate: false }, () => {
      setTimeout(() => {
        this.setData({ pageAnimate: true })
      }, 20)
    })

    console.log('详情页接收参数:', options)

    if (options.herb) {
      try {
        const herb = JSON.parse(decodeURIComponent(options.herb))
        console.log('图鉴数据:', herb)
        const detail = HERB_DB[herb.name] || {}

        this.setData({
          mode: 'herbarium',
          name: herb.name || '未知药材',
          discovered: herb.discovered || false,
          imagePath: herb.image || '',
          discoveredTime: herb.discoveredTime || '',
          confidence: herb.confidence || 0,
          scientific: herb.scientific || detail.scientific || '暂无数据',
          taste: herb.taste || detail.taste || '暂无数据',
          meridian: herb.meridian || detail.meridian || '暂无数据',
          efficacy: herb.efficacy || detail.efficacy || '暂无数据',
          indications: herb.indications || detail.indications || '暂无数据',
          caution: herb.caution || detail.caution || '暂无数据'
        })
        return
      } catch (e) {
        console.log('解析 herb 参数失败：', e)
      }
    }

    if (options.item) {
      try {
        const item = JSON.parse(decodeURIComponent(options.item))
        console.log('历史记录数据:', item)
        const detail = HERB_DB[item.name] || {}

        this.setData({
          mode: 'history',
          imagePath: item.imagePath || '',
          name: item.name || '未知药材',
          confidence: item.confidence || 0,
          time: item.time || '',
          discovered: true,
          scientific: detail.scientific || '暂无数据',
          taste: detail.taste || '暂无数据',
          meridian: detail.meridian || '暂无数据',
          efficacy: detail.efficacy || '暂无数据',
          indications: detail.indications || '暂无数据',
          caution: detail.caution || '暂无数据'
        })
        return
      } catch (e) {
        console.log('解析 item 参数失败：', e)
      }
    }

    console.warn('未识别到有效参数')
    this.setData({
      name: '未知药材',
      scientific: '暂无数据',
      taste: '暂无数据',
      meridian: '暂无数据',
      efficacy: '暂无数据',
      indications: '暂无数据',
      caution: '暂无数据'
    })
  },

  goBack() {
    wx.navigateBack()
  },

  goHome() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})