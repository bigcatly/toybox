App({
  globalData: {
    appName: '玩具箱',
    version: '2.0.0',
    tabs: [
      { key: 'home', text: '首页', icon: '⌂', url: '/pages/index/index' },
      { key: 'category', text: '分类', icon: '▦', url: '/pages/category/category' },
      { key: 'cabinet', text: '玩具柜', icon: '▤', url: '/pages/cabinet/cabinet' },
      { key: 'mine', text: '我的', icon: '☺', url: '/pages/mine/mine' }
    ]
  },

  onLaunch() {
    this.ensureStats()
  },

  ensureStats() {
    const today = this.getTodayKey()
    const saved = wx.getStorageSync('toybox_stats') || {}
    const stats = {
      launchedAt: saved.launchedAt || Date.now(),
      lastDate: saved.lastDate || today,
      todayPlayed: saved.lastDate === today ? (saved.todayPlayed || 0) : 0,
      totalPlayed: saved.totalPlayed || saved.played || 0,
      totalMinutes: saved.totalMinutes || 38,
      merit: saved.merit || 1089,
      combo: saved.combo || 23,
      wheelCount: saved.wheelCount || 8,
      favorites: saved.favorites && saved.favorites.length ? saved.favorites : ['wooden-fish', 'decision-wheel', 'bubble-wrap', 'offwork-countdown'],
      recent: saved.recent || [
        { id: 'boss-coming', time: '今天 09:30' },
        { id: 'breathing-lamp', time: '今天 08:50' },
        { id: 'daily-fortune', time: '今天 08:20' }
      ],
      wheelHistory: saved.wheelHistory || [
        { text: '继续摸鱼', icon: '🦥', tone: 'green', time: '刚刚' },
        { text: '喝奶茶', icon: '🧋', tone: 'pink', time: '2分钟前' },
        { text: '今天开心', icon: '☀️', tone: 'mint', time: '5分钟前' }
      ]
    }
    wx.setStorageSync('toybox_stats', stats)
    return stats
  },

  getTodayKey() {
    const date = new Date()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${date.getFullYear()}-${month}-${day}`
  },

  getStats() {
    return this.ensureStats()
  },

  saveStats(stats) {
    wx.setStorageSync('toybox_stats', stats)
    return stats
  },

  recordPlay(id) {
    const stats = this.ensureStats()
    stats.todayPlayed += 1
    stats.totalPlayed += 1
    stats.totalMinutes += 1
    stats.lastDate = this.getTodayKey()
    stats.recent = [{ id, time: '刚刚' }, ...(stats.recent || []).filter((item) => item.id !== id)].slice(0, 6)
    return this.saveStats(stats)
  },

  addMerit(delta = 1) {
    const stats = this.ensureStats()
    stats.merit += delta
    stats.combo += 1
    return this.saveStats(stats)
  },

  addWheelResult(result) {
    const stats = this.ensureStats()
    stats.wheelCount += 1
    stats.wheelHistory = [result, ...(stats.wheelHistory || [])].slice(0, 8)
    return this.saveStats(stats)
  },

  toggleFavorite(id) {
    const stats = this.ensureStats()
    const favorites = stats.favorites || []
    const index = favorites.indexOf(id)
    if (index >= 0) {
      favorites.splice(index, 1)
    } else {
      favorites.unshift(id)
    }
    stats.favorites = favorites.slice(0, 20)
    return this.saveStats(stats)
  },

  navigateTab(key) {
    const target = this.globalData.tabs.find((item) => item.key === key)
    if (!target) return
    wx.redirectTo({ url: target.url })
  }
})
