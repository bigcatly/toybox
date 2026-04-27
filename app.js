App({
  globalData: {
    appName: '玩具箱',
    version: '1.0.0'
  },

  onLaunch() {
    const launched = wx.getStorageSync('toybox_launched')
    if (!launched) {
      wx.setStorageSync('toybox_launched', Date.now())
      wx.setStorageSync('toybox_stats', {
        played: 0,
        favorites: []
      })
    }
  },

  addPlayedCount() {
    const stats = wx.getStorageSync('toybox_stats') || { played: 0, favorites: [] }
    stats.played = (stats.played || 0) + 1
    wx.setStorageSync('toybox_stats', stats)
    return stats
  },

  toggleFavorite(id) {
    const stats = wx.getStorageSync('toybox_stats') || { played: 0, favorites: [] }
    const favorites = stats.favorites || []
    const index = favorites.indexOf(id)
    if (index >= 0) {
      favorites.splice(index, 1)
    } else {
      favorites.push(id)
    }
    stats.favorites = favorites
    wx.setStorageSync('toybox_stats', stats)
    return stats
  }
})
