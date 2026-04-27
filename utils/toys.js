const categories = [
  { id: 'all', name: '全部', emoji: '🧸' },
  { id: 'relax', name: '解压', emoji: '🍃' },
  { id: 'luck', name: '好运', emoji: '✨' },
  { id: 'choice', name: '选择', emoji: '🎯' },
  { id: 'focus', name: '专注', emoji: '🫧' }
]

const toys = [
  {
    id: 'wooden-fish',
    name: '敲木鱼',
    subtitle: '功德 +1，烦恼 -1',
    description: '轻点电子木鱼，给今天攒一点轻松的功德。',
    category: 'relax',
    emoji: '🐟',
    gradient: 'linear-gradient(135deg, #ffd36b, #ff8a3d)',
    tags: ['解压', '点击', '功德']
  },
  {
    id: 'decision-wheel',
    name: '决策转盘',
    subtitle: '让转盘替你做选择',
    description: '吃什么、玩什么、先做哪件事，都交给命运小转盘。',
    category: 'choice',
    emoji: '🎡',
    gradient: 'linear-gradient(135deg, #80d0ff, #7f7cff)',
    tags: ['选择困难', '随机', '聚会']
  },
  {
    id: 'breathing-ball',
    name: '呼吸球',
    subtitle: '跟着节奏慢慢呼吸',
    description: '吸气、屏息、呼气，给自己 60 秒的安静。',
    category: 'focus',
    emoji: '🫧',
    gradient: 'linear-gradient(135deg, #8ef6d1, #60a5fa)',
    tags: ['放松', '呼吸', '专注']
  },
  {
    id: 'lucky-dice',
    name: '幸运骰子',
    subtitle: '掷一下看看今天几分运气',
    description: '一个轻量骰子，适合小游戏、惩罚、随机数字。',
    category: 'luck',
    emoji: '🎲',
    gradient: 'linear-gradient(135deg, #fda4af, #c084fc)',
    tags: ['随机', '好运', '小游戏']
  },
  {
    id: 'bubble-wrap',
    name: '电子泡泡纸',
    subtitle: '啪、啪、啪，在线解压',
    description: '点破屏幕里的泡泡，获得一点无意义但很快乐的反馈。',
    category: 'relax',
    emoji: '🫧',
    gradient: 'linear-gradient(135deg, #bae6fd, #a7f3d0)',
    tags: ['解压', '点击', '治愈']
  },
  {
    id: 'daily-fortune',
    name: '今日抽签',
    subtitle: '抽一支只负责可爱的签',
    description: '随机抽一句今天的小提示，不严肃，但可能有用。',
    category: 'luck',
    emoji: '🥠',
    gradient: 'linear-gradient(135deg, #fde68a, #fb7185)',
    tags: ['签文', '好运', '每日']
  }
]

function getToyById(id) {
  return toys.find((toy) => toy.id === id)
}

function getCategoryName(id) {
  const category = categories.find((item) => item.id === id)
  return category ? category.name : '玩具'
}

module.exports = {
  categories,
  toys,
  getToyById,
  getCategoryName
}
