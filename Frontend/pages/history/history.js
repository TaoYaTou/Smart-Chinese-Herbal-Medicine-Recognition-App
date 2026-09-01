const app = getApp()
const HERB_DB = app.globalData.HERB_DB || {}

Page({
  data: {
    pageAnimate: true,
    currentTab: 'history',
    historyList: [],
    herbariumList: [],
    filteredHerbariumList: [],
    discoveredCount: 0,
    totalCount: 0,
    searchKeyword: ''
  },

  onShow() {
    this.setData({ 
      pageAnimate: false,
      searchKeyword: '',
      filteredHerbariumList: []
    }, () => {
      setTimeout(() => {
        this.setData({ pageAnimate: true })
      }, 20)
    })

    const history = wx.getStorageSync('history') || []
    this.setData({ historyList: history })
    this.loadHerbarium()
  },

  loadHerbarium() {
    let herbariumData = wx.getStorageSync('herbariumData') || {}
    const history = wx.getStorageSync('history') || []
    const firstRecordMap = {}
    history.forEach(item => {
      if (item.name && !firstRecordMap[item.name]) {
        firstRecordMap[item.name] = item
      }
    })

    const herbariumList = []
    Object.keys(HERB_DB).forEach(key => {
      const herb = HERB_DB[key]
      const stored = herbariumData[herb.name] || {}
      const discovered = stored.discovered !== undefined ? stored.discovered : !!firstRecordMap[herb.name]
      const firstRecord = firstRecordMap[herb.name] || null

      herbariumList.push({
        ...herb,
        discovered: discovered,
        image: stored.image || (firstRecord ? firstRecord.imagePath : null),
        discoveredTime: stored.discoveredTime || (firstRecord ? firstRecord.time : null),
        confidence: stored.confidence || (firstRecord ? firstRecord.confidence : null)
      })
    })

    herbariumList.sort((a, b) => {
      if (a.discovered && !b.discovered) return -1
      if (!a.discovered && b.discovered) return 1
      return a.name.localeCompare(b.name, 'zh')
    })

    const discoveredCount = herbariumList.filter(item => item.discovered).length
    const totalCount = herbariumList.length

    this.setData({
      herbariumList,
      discoveredCount,
      totalCount
    })

    this.filterHerbarium(this.data.searchKeyword)
  },

  filterHerbarium(keyword) {
    const keywordLower = keyword.trim().toLowerCase()
    let filtered = this.data.herbariumList
    if (keywordLower) {
      filtered = this.data.herbariumList.filter(item => {
        const nameMatch = item.name && item.name.includes(keyword)
        const scientificMatch = item.scientific && item.scientific.toLowerCase().includes(keywordLower)
        return nameMatch || scientificMatch
      })
    }
    this.setData({
      filteredHerbariumList: filtered
    })
  },

  onSearchInput(e) {
    const keyword = e.detail.value || ''
    this.setData({ searchKeyword: keyword })
    this.filterHerbarium(keyword)
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
    if (tab === 'herbarium') {
      this.loadHerbarium()
    }
  },

  goDetail(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/history-detail/history-detail?item=' + encodeURIComponent(JSON.stringify(item))
    })
  },

  goHerbariumDetail(e) {
    const herb = e.currentTarget.dataset.herb
    wx.navigateTo({
      url: '/pages/history-detail/history-detail?herb=' + encodeURIComponent(JSON.stringify(herb))
    })
  },

  onImageError(e) {
    const index = e.currentTarget.dataset.index
    const key = `herbariumList[${index}].image`
    this.setData({
      [key]: '/images/default_herb.png'
    })
  },

  onHistoryImageError(e) {
    const index = e.currentTarget.dataset.index
    const key = `historyList[${index}].imagePath`
    this.setData({
      [key]: '/images/default_herb.png'
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
      this.loadHerbarium()
    }
  }
})