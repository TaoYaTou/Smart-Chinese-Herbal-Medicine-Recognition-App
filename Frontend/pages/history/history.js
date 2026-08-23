Page({
  data: {
    historyList: []
  },

  onShow() {
    this.loadHistory()
  },

  loadHistory() {
    const history = wx.getStorageSync('history') || []
    this.setData({
      historyList: history
    })
  },
  goDetail(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/history-detail/history-detail?item=' + encodeURIComponent(JSON.stringify(item))
    })
  }
})