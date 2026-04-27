const { categories, toys, getCategoryName } = require('../../utils/toys')
const app = getApp()

Page({
  data: {
    categories,
    toys: [],
    filteredToys: [],
    featuredToys: [],
    activeCategory: 'all',
    keyword: '',
    stats: {
      played: 0,
      favorites: []
    }
  },

  onLoad() {
    this.refreshPage()
  },

  onShow() {
    this.loadStats()
  },

  onPullDownRefresh() {
    this.refreshPage()
    wx.stopPullDownRefresh()
  },

  withFavoriteState(list, favorites) {
    return list.map((toy) => ({
      ...toy,
      isFavorite: favorites.indexOf(toy.id) >= 0
    }))
  },

  refreshPage() {
    const stats = wx.getStorageSync('toybox_stats') || { played: 0, favorites: [] }
    const toyList = this.withFavoriteState(toys, stats.favorites || [])
    const shuffled = toyList.slice().sort(() => Math.random() - 0.5)
    this.setData({
      toys: toyList,
      stats,
      featuredToys: shuffled.slice(0, 2)
    })
    this.applyFilter()
  },

  loadStats() {
    const stats = wx.getStorageSync('toybox_stats') || { played: 0, favorites: [] }
    const toyList = this.withFavoriteState(toys, stats.favorites || [])
    const featuredToys = this.data.featuredToys.map((toy) => ({
      ...toy,
      isFavorite: (stats.favorites || []).indexOf(toy.id) >= 0
    }))
    this.setData({ stats, toys: toyList, featuredToys }, () => {
      this.applyFilter()
    })
  },

  handleSearch(e) {
    this.setData({ keyword: e.detail.value || '' }, () => {
      this.applyFilter()
    })
  },

  clearSearch() {
    this.setData({ keyword: '' }, () => {
      this.applyFilter()
    })
  },

  chooseCategory(e) {
    const { id } = e.currentTarget.dataset
    this.setData({ activeCategory: id }, () => {
      this.applyFilter()
    })
  },

  applyFilter() {
    const { activeCategory, keyword } = this.data
    const normalizedKeyword = keyword.trim().toLowerCase()
    const source = this.data.toys.length ? this.data.toys : this.withFavoriteState(toys, (this.data.stats && this.data.stats.favorites) || [])
    const filteredToys = source.filter((toy) => {
      const categoryMatched = activeCategory === 'all' || toy.category === activeCategory
      const keywordMatched = !normalizedKeyword || [toy.name, toy.subtitle, toy.description, toy.tags.join(' '), getCategoryName(toy.category)]
        .join(' ')
        .toLowerCase()
        .includes(normalizedKeyword)
      return categoryMatched && keywordMatched
    })

    this.setData({ filteredToys })
  },

  goToy(e) {
    const { id } = e.currentTarget.dataset
    if (!id) return
    app.addPlayedCount()
    wx.navigateTo({
      url: `/pages/toy/toy?id=${id}`
    })
  },

  randomToy() {
    const list = this.data.filteredToys.length ? this.data.filteredToys : this.data.toys
    const target = list[Math.floor(Math.random() * list.length)]
    if (!target) return
    app.addPlayedCount()
    wx.navigateTo({
      url: `/pages/toy/toy?id=${target.id}`
    })
  },

  toggleFavorite(e) {
    const { id } = e.currentTarget.dataset
    const stats = app.toggleFavorite(id)
    const toyList = this.withFavoriteState(toys, stats.favorites || [])
    const featuredToys = this.data.featuredToys.map((toy) => ({
      ...toy,
      isFavorite: (stats.favorites || []).indexOf(toy.id) >= 0
    }))
    this.setData({ stats, toys: toyList, featuredToys }, () => {
      this.applyFilter()
    })
    wx.showToast({
      title: stats.favorites.indexOf(id) >= 0 ? '已收藏' : '已取消',
      icon: 'none'
    })
  },

  onShareAppMessage() {
    return {
      title: '打开这个好玩的小玩具箱',
      path: '/pages/index/index'
    }
  }
})
