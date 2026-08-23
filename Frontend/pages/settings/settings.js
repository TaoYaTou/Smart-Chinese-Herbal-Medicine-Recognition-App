Page({
  data: {
    noticeEnabled: true,
    clearing: false
  },

  onShow() {

    this.syncNoticeStatus()
  },

  syncNoticeStatus() {
    let storedValue = wx.getStorageSync('showNotice')

    if (storedValue === undefined || storedValue === '') {
      storedValue = true
      wx.setStorageSync('showNotice', true)
    }
    this.setData({ noticeEnabled: storedValue })
  },

  toggleNoticeSwitch(e) {
    const newStatus = e.detail.value
    this.setData({ noticeEnabled: newStatus })
    wx.setStorageSync('showNotice', newStatus)
    wx.showToast({
      title: newStatus ? '已开启使用须知' : '已关闭使用须知',
      icon: 'success',
      duration: 1500
    })
  },

  clearHistory() {
    if (this.data.clearing) return

    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有识别历史记录吗？此操作不可恢复。',
      confirmColor: '#e74c3c',
      success: (res) => {
        if (res.confirm) {
          this.setData({ clearing: true })
          setTimeout(() => {
            wx.setStorageSync('history', [])
            this.setData({ clearing: false })
            wx.showToast({
              title: '已清除所有历史记录',
              icon: 'success',
              duration: 1500
            })
          }, 600)
        }
      }
    })
  }
})