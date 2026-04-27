const categories = [
  { id: 'all', name: '全部', icon: '⭐', tone: 'orange' },
  { id: 'relax', name: '解压', icon: '☁️', tone: 'green', title: '解压一下', subtitle: '轻轻一点，压力散开' },
  { id: 'random', name: '随机', icon: '🎉', tone: 'pink', title: '随机快乐', subtitle: '交给运气，惊喜不断' },
  { id: 'fish', name: '摸鱼', icon: '🐟', tone: 'blue', title: '摸鱼神器', subtitle: '假装很忙，也要快乐' },
  { id: 'heal', name: '治愈', icon: '🏠', tone: 'purple', title: '治愈小屋', subtitle: '放松助眠，温柔陪伴' },
  { id: 'party', name: '聚会', icon: '🎊', tone: 'yellow', title: '聚会整活', subtitle: '朋友局的快乐开关' }
]

const toys = [
  {
    id: 'wooden-fish',
    name: '电子木鱼',
    shortName: '木鱼',
    subtitle: '敲一下，烦恼 -1，功德 +1',
    description: '敲一下，烦恼 -1，功德 +1。',
    category: 'relax',
    icon: '🐟',
    image: '/assets/toys/wooden-fish.svg',
    tone: 'yellow',
    hot: '52.1w',
    status: 'today',
    tags: ['功德', '解压', '点击']
  },
  {
    id: 'bubble-wrap',
    name: '捏泡泡纸',
    shortName: '泡泡纸',
    subtitle: '啵啵啵，超解压！',
    description: '点击每一个小泡泡，听见压力啪地消失。',
    category: 'relax',
    icon: '🫧',
    image: '/assets/toys/bubble-wrap.svg',
    tone: 'blue',
    hot: '31.6w',
    tags: ['解压', '点击', '治愈']
  },
  {
    id: 'whack-mole',
    name: '打地鼠',
    shortName: '地鼠',
    subtitle: '小锤子出击',
    description: '看到地鼠就敲，释放今天的小情绪。',
    category: 'relax',
    icon: '🔨',
    image: '/assets/toys/mole.svg',
    tone: 'green',
    hot: '18.8w',
    tags: ['点击', '反应', '解压']
  },
  {
    id: 'fireworks',
    name: '放烟花',
    shortName: '烟花',
    subtitle: '屏幕里的小庆祝',
    description: '点一下，给自己放一朵小烟花。',
    category: 'relax',
    icon: '🎆',
    image: '/assets/toys/fireworks.svg',
    tone: 'pink',
    hot: '22.5w',
    tags: ['治愈', '视觉', '快乐']
  },
  {
    id: 'decision-wheel',
    name: '幸运转盘',
    shortName: '转盘',
    subtitle: '好运转一转，惊喜不断',
    description: '选择困难？让命运帮你。',
    category: 'random',
    icon: '🎡',
    image: '/assets/toys/wheel.svg',
    tone: 'pink',
    hot: '38.7w',
    tags: ['随机', '选择', '聚会']
  },
  {
    id: 'coin-flip',
    name: '抛硬币',
    shortName: '硬币',
    subtitle: '正面还是反面',
    description: '轻轻一抛，把选择交给硬币。',
    category: 'random',
    icon: '🪙',
    image: '/assets/toys/coin.svg',
    tone: 'yellow',
    hot: '16.9w',
    tags: ['随机', '选择']
  },
  {
    id: 'lucky-dice',
    name: '摇骰子',
    shortName: '骰子',
    subtitle: '掷一下看看运气',
    description: '掷出今天的小幸运。',
    category: 'random',
    icon: '🎲',
    image: '/assets/toys/dice.svg',
    tone: 'cream',
    hot: '29.4w',
    tags: ['随机', '聚会']
  },
  {
    id: 'daily-fortune',
    name: '今日抽签',
    shortName: '抽签',
    subtitle: '抽个签，看看运势',
    description: '今天的好运从一支签开始。',
    category: 'random',
    icon: '🥢',
    image: '/assets/toys/fortune.svg',
    tone: 'yellow',
    hot: '24.2w',
    tags: ['好运', '每日']
  },
  {
    id: 'offwork-countdown',
    name: '下班倒计时',
    shortName: '倒计时',
    subtitle: '一起期待下班时刻～',
    description: '距离快乐下班还有多久？',
    category: 'fish',
    icon: '⏰',
    image: '/assets/toys/clock.svg',
    tone: 'blue',
    hot: '41.2w',
    tags: ['摸鱼', '时间']
  },
  {
    id: 'boss-coming',
    name: '老板来了',
    shortName: '老板',
    subtitle: '老板别来！吓一跳～',
    description: '一键切换成认真工作的样子。',
    category: 'fish',
    icon: '👨‍💻',
    image: '/assets/toys/boss.svg',
    tone: 'cream',
    hot: '19.7w',
    tags: ['摸鱼', '整活']
  },
  {
    id: 'fake-loading',
    name: '假装加载中',
    shortName: '加载中',
    subtitle: '认真加载，实际摸鱼',
    description: '一个看起来很忙的加载动画。',
    category: 'fish',
    icon: '◌',
    image: '/assets/toys/loading.svg',
    tone: 'blue',
    hot: '13.3w',
    tags: ['摸鱼', '伪装']
  },
  {
    id: 'fish-clock',
    name: '摸鱼时钟',
    shortName: '时钟',
    subtitle: '今天也要慢慢来',
    description: '把时间调成舒服的节奏。',
    category: 'fish',
    icon: '🕘',
    image: '/assets/toys/fish-clock.svg',
    tone: 'blue',
    hot: '9.8w',
    tags: ['摸鱼', '时间']
  },
  {
    id: 'rain-sound',
    name: '雨声播放器',
    shortName: '雨声',
    subtitle: '听一场小雨',
    description: '假装窗外正在下雨。',
    category: 'heal',
    icon: '🌧️',
    image: '/assets/toys/rain.svg',
    tone: 'purple',
    hot: '26.2w',
    tags: ['白噪音', '治愈']
  },
  {
    id: 'breathing-lamp',
    name: '呼吸灯',
    shortName: '呼吸灯',
    subtitle: '灯光慢慢亮，心也慢慢静',
    description: '跟着光的节奏呼吸。',
    category: 'heal',
    icon: '💡',
    image: '/assets/toys/lamp.svg',
    tone: 'purple',
    hot: '26.2w',
    tags: ['呼吸', '治愈']
  },
  {
    id: 'white-noise',
    name: '白噪音',
    shortName: '白噪音',
    subtitle: '轻轻的背景声',
    description: '给脑袋一点安静的陪伴。',
    category: 'heal',
    icon: '🎵',
    image: '/assets/toys/music.svg',
    tone: 'purple',
    hot: '14.6w',
    tags: ['声音', '放松']
  },
  {
    id: 'cloud-generator',
    name: '云朵生成器',
    shortName: '云朵',
    subtitle: '生成今天的小云朵',
    description: '随机生成一朵可爱云。',
    category: 'heal',
    icon: '☁️',
    image: '/assets/toys/cloud.svg',
    tone: 'purple',
    hot: '12.1w',
    tags: ['治愈', '随机']
  },
  {
    id: 'truth-wheel',
    name: '真心话转盘',
    shortName: '真心话',
    subtitle: '朋友局破冰神器',
    description: '让转盘抽一个真心话。',
    category: 'party',
    icon: '🎡',
    image: '/assets/toys/wheel.svg',
    tone: 'yellow',
    hot: '18.2w',
    tags: ['聚会', '破冰']
  },
  {
    id: 'adventure-card',
    name: '大冒险卡',
    shortName: '冒险卡',
    subtitle: '抽一张任务卡',
    description: '聚会气氛由它点燃。',
    category: 'party',
    icon: '❔',
    image: '/assets/toys/card.svg',
    tone: 'yellow',
    hot: '17.1w',
    tags: ['聚会', '任务']
  },
  {
    id: 'milk-tea',
    name: '谁买奶茶',
    shortName: '奶茶',
    subtitle: '奶茶局公平裁判',
    description: '随机选出今天的奶茶担当。',
    category: 'party',
    icon: '🧋',
    image: '/assets/toys/milk-tea.svg',
    tone: 'yellow',
    hot: '12.9w',
    tags: ['聚会', '随机']
  },
  {
    id: 'draw-guess',
    name: '你画我猜',
    shortName: '画猜',
    subtitle: '画一画，猜一猜',
    description: '简单快乐的聚会小游戏。',
    category: 'party',
    icon: '📝',
    image: '/assets/toys/draw.svg',
    tone: 'yellow',
    hot: '10.8w',
    tags: ['聚会', '绘画']
  }
]

const quickPicks = [
  { id: 'recent', title: '最近常玩', subtitle: '我常玩的玩具', icon: '⭐', tone: 'green' },
  { id: 'afterWork', title: '打工人最爱', subtitle: '解压好心情', icon: '💼', tone: 'orange' },
  { id: 'sleep', title: '睡前治愈', subtitle: '放松助眠', icon: '🌙', tone: 'blue' }
]

const achievements = [
  { id: 'wood-master', name: '木鱼大师', desc: '敲出 10888 次', icon: '🐟', tone: 'orange' },
  { id: 'fish-rookie', name: '摸鱼新星', desc: '累计摸鱼 30 分钟', icon: '⭐', tone: 'blue' },
  { id: 'fate-bond', name: '命运赌徒', desc: '转盘抽奖 50 次', icon: '🎲', tone: 'purple' },
  { id: 'healer', name: '治愈收藏家', desc: '解锁 10 个玩具', icon: '🧪', tone: 'green' }
]

function getToyById(id) {
  return toys.find((toy) => toy.id === id)
}

function getCategoryById(id) {
  return categories.find((item) => item.id === id)
}

function getToysByCategory(id) {
  if (id === 'all') return toys
  return toys.filter((toy) => toy.category === id)
}

function enrichToys(ids) {
  return ids.map((id) => getToyById(id)).filter(Boolean)
}

module.exports = {
  categories,
  toys,
  quickPicks,
  achievements,
  getToyById,
  getCategoryById,
  getToysByCategory,
  enrichToys
}
