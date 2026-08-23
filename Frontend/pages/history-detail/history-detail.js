const app = getApp()
const HERB_DB = app.globalData.HERB_DB || {}

Page({
  data: {
    imagePath: '',
    name: '',
    confidence: 0,
    time: '',
    scientific: '暂无数据',
    taste: '暂无数据',
    meridian: '暂无数据',
    efficacy: '暂无数据',
    indications: '暂无数据',
    caution: '暂无数据'
  },

  onLoad(options) {
    const item = JSON.parse(decodeURIComponent(options.item || '{}'))
    const detail = HERB_DB[item.name] || {}
    this.setData({
      imagePath: item.imagePath || '',
      name: item.name || '未知药材',
      confidence: item.confidence || 0,
      time: item.time || '',
      scientific: detail.scientific || '暂无数据',
      taste: detail.taste || '暂无数据',
      meridian: detail.meridian || '暂无数据',
      efficacy: detail.efficacy || '暂无数据',
      indications: detail.indications || '暂无数据',
      caution: detail.caution || '暂无数据'
    })
  },

  goBack() {
    wx.navigateBack()
  }
})