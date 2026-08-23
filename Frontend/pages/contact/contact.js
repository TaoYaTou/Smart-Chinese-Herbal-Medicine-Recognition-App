Page({
  copyEmail() {
    wx.setClipboardData({
      data: 'XXXXXXXXXXX@qq.com',
      success: () => {
        wx.showToast({
          title: '邮箱已复制',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },

  copyDatasetLink() {
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
  }
})