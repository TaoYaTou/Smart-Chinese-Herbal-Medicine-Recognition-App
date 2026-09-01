Page({
  data: {
    pageAnimate: true,
    noticeEnabled: true,
    clearing: false
  },

  onShow() {
    this.setData({ pageAnimate: false }, () => {
      setTimeout(() => {
        this.setData({ pageAnimate: true })
      }, 20)
    })

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
      content: '确定要清除所有识别历史记录吗？图鉴数据不会丢失。',
      confirmColor: '#e74c3c',
      success: (res) => {
        if (res.confirm) {
          this.setData({ clearing: true })
          setTimeout(() => {
            wx.setStorageSync('history', [])
            this.setData({ clearing: false })
            wx.showToast({
              title: '已清除历史记录，图鉴保留',
              icon: 'success',
              duration: 1500
            })
          }, 600)
        }
      }
    })
  }
})