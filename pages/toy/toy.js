const { getToyById } = require('../../utils/toys')

const DEFAULT_WHEEL_OPTIONS = ['火锅', '拉面', '寿司', '轻食', '随便走走']
const FORTUNES = [
  { level: '大吉', text: '今天适合先做最简单的那件事，快乐会自动滚大。' },
  { level: '小吉', text: '路过便利店的时候，可能会遇到一个刚好想吃的小东西。' },
  { level: '中吉', text: '别急着证明自己，先喝口水，状态会回来。' },
  { level: '可爱吉', text: '你今天的幸运动作是：把肩膀放松下来。' },
  { level: '摸鱼吉', text: '认真摸鱼三分钟，也算是在给大脑做保养。' },
  { level: '灵感吉', text: '一个好点子可能藏在看起来没用的玩耍里。' }
]

function buildBubbles() {
  return Array.from({ length: 30 }, (_, index) => ({
    id: index,
    popped: false,
    size: 54 + (index % 3) * 12
  }))
}

Page({
  data: {
    toy: null,
    merit: 0,
    woodHits: [],
    wheelOptions: DEFAULT_WHEEL_OPTIONS,
    wheelInput: '',
    wheelRotation: 0,
    wheelResult: '',
    spinning: false,
    breathRunning: false,
    breathPhaseIndex: 0,
    currentBreathPhase: { name: '吸气', tip: '慢慢吸气，让气球变大', duration: 4 },
    breathPhases: [
      { name: '吸气', tip: '慢慢吸气，让气球变大', duration: 4 },
      { name: '屏息', tip: '轻轻停住，不用用力', duration: 2 },
      { name: '呼气', tip: '缓慢呼气，把压力放掉', duration: 6 }
    ],
    diceValue: 1,
    diceRolling: false,
    diceHistory: [],
    bubbles: buildBubbles(),
    poppedCount: 0,
    fortune: null
  },

  breathTimer: null,

  onLoad(query) {
    const toy = getToyById(query.id) || getToyById('wooden-fish')
    this.setData({ toy })
    wx.setNavigationBarTitle({ title: toy.name })
  },

  onUnload() {
    this.stopBreathing()
  },

  tapWoodenFish() {
    const nextMerit = this.data.merit + 1
    const woodHits = [{ id: Date.now(), text: '功德 +1' }, ...this.data.woodHits].slice(0, 5)
    this.setData({ merit: nextMerit, woodHits })
    wx.vibrateShort({ type: 'light' })
  },

  resetWoodenFish() {
    this.setData({ merit: 0, woodHits: [] })
    wx.showToast({ title: '已清空功德', icon: 'none' })
  },

  handleWheelInput(e) {
    this.setData({ wheelInput: e.detail.value })
  },

  addWheelOption() {
    const value = this.data.wheelInput.trim()
    if (!value) return
    if (this.data.wheelOptions.length >= 10) {
      wx.showToast({ title: '最多添加 10 个选项', icon: 'none' })
      return
    }
    this.setData({
      wheelOptions: [...this.data.wheelOptions, value],
      wheelInput: ''
    })
  },

  removeWheelOption(e) {
    if (this.data.spinning) return
    const index = Number(e.currentTarget.dataset.index)
    if (this.data.wheelOptions.length <= 2) {
      wx.showToast({ title: '至少保留 2 个选项', icon: 'none' })
      return
    }
    const wheelOptions = this.data.wheelOptions.filter((_, optionIndex) => optionIndex !== index)
    this.setData({ wheelOptions })
  },

  spinWheel() {
    if (this.data.spinning) return
    const options = this.data.wheelOptions
    const pickedIndex = Math.floor(Math.random() * options.length)
    const extraRotation = 1440 + pickedIndex * (360 / options.length) + Math.floor(Math.random() * 60)
    this.setData({
      spinning: true,
      wheelResult: '',
      wheelRotation: this.data.wheelRotation + extraRotation
    })
    wx.vibrateShort({ type: 'medium' })
    setTimeout(() => {
      this.setData({
        spinning: false,
        wheelResult: options[pickedIndex]
      })
      wx.showToast({ title: `选 ${options[pickedIndex]}`, icon: 'none' })
    }, 1500)
  },

  toggleBreathing() {
    if (this.data.breathRunning) {
      this.stopBreathing()
      return
    }
    this.setData({
      breathRunning: true,
      breathPhaseIndex: 0,
      currentBreathPhase: this.data.breathPhases[0]
    })
    this.scheduleBreathNext()
  },

  scheduleBreathNext() {
    clearTimeout(this.breathTimer)
    const phase = this.data.breathPhases[this.data.breathPhaseIndex]
    this.breathTimer = setTimeout(() => {
      const nextIndex = (this.data.breathPhaseIndex + 1) % this.data.breathPhases.length
      this.setData({
        breathPhaseIndex: nextIndex,
        currentBreathPhase: this.data.breathPhases[nextIndex]
      })
      this.scheduleBreathNext()
    }, phase.duration * 1000)
  },

  stopBreathing() {
    clearTimeout(this.breathTimer)
    this.breathTimer = null
    this.setData({
      breathRunning: false,
      breathPhaseIndex: 0,
      currentBreathPhase: this.data.breathPhases[0]
    })
  },

  rollDice() {
    if (this.data.diceRolling) return
    this.setData({ diceRolling: true })
    wx.vibrateShort({ type: 'light' })

    let count = 0
    const timer = setInterval(() => {
      count += 1
      this.setData({ diceValue: Math.ceil(Math.random() * 6) })
      if (count >= 8) {
        clearInterval(timer)
        const diceValue = Math.ceil(Math.random() * 6)
        this.setData({
          diceValue,
          diceRolling: false,
          diceHistory: [diceValue, ...this.data.diceHistory].slice(0, 8)
        })
      }
    }, 90)
  },

  popBubble(e) {
    const index = Number(e.currentTarget.dataset.index)
    const bubbles = this.data.bubbles.map((bubble, bubbleIndex) => (
      bubbleIndex === index ? { ...bubble, popped: true } : bubble
    ))
    const poppedCount = bubbles.filter((bubble) => bubble.popped).length
    this.setData({ bubbles, poppedCount })
    wx.vibrateShort({ type: 'light' })
  },

  resetBubbles() {
    this.setData({
      bubbles: buildBubbles(),
      poppedCount: 0
    })
  },

  drawFortune() {
    const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)]
    this.setData({ fortune })
    wx.vibrateShort({ type: 'light' })
  },

  onShareAppMessage() {
    return {
      title: `来玩「${this.data.toy ? this.data.toy.name : '玩具箱'}」`,
      path: `/pages/toy/toy?id=${this.data.toy ? this.data.toy.id : 'wooden-fish'}`
    }
  }
})
