/**
 * 模拟热门平台数据生成器
 * 用于本地测试单平台刷新功能
 */

// 模拟生成随机新闻条目
const generateRandomNewsItems = (count = 10, platformId) => {
  const titles = [
    '研究发现喝咖啡可能延长寿命',
    '专家警告全球变暖加速',
    '新手机发布会引发抢购热潮',
    '世界杯资格赛：国足取得关键胜利',
    '新冠疫情最新研究成果公布',
    '人工智能在医疗领域取得重大突破',
    '股市大幅波动，投资者需谨慎',
    '新能源汽车销量创历史新高',
    '教育部发布最新学生减负政策',
    '太空探索：火星发现疑似生命迹象',
    '科学家发现新型抗生素',
    '5G技术将如何改变我们的生活',
    '顶尖大学最新排名出炉',
    '央行调整利率政策引发热议',
    '旅游业复苏：热门景点迎来人流高峰',
    '电影《封神》票房突破30亿',
    '新研究表明睡眠对免疫系统至关重要',
    '专家预测房地产市场未来走势',
    'AI绘画引发版权争议',
    '全国多地迎来强降雨天气',
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const randomIndex = Math.floor(Math.random() * titles.length);
    return {
      rank: i + 1,
      title: titles[randomIndex],
      is_hot: Math.random() > 0.7,
      is_new: Math.random() > 0.8,
      link: `https://example.com/${platformId}/news/${i + 1}`,
      read_count: `${Math.floor(Math.random() * 100000)}`,
    };
  });
};

// 创建一个平台数据
const createPlatformData = (id, name, description) => {
  return {
    id,
    name,
    description,
    icon: id,
    last_updated: new Date().toISOString(),
    news: generateRandomNewsItems(10, id),
  };
};

// 生成模拟平台数据
export const generateMockPlatformData = () => {
  return [
    createPlatformData('weibo', '微博', '实时热搜'),
    createPlatformData('zhihu', '知乎', '热门榜单'),
    createPlatformData('baidu', '百度', '热点讨论'),
    createPlatformData('douyin', '抖音', '热点榜单'),
  ];
};

// 刷新单个平台数据
export const refreshPlatformData = (platformId) => {
  const platformInfo = {
    weibo: { name: '微博', description: '实时热搜' },
    zhihu: { name: '知乎', description: '热门榜单' },
    baidu: { name: '百度', description: '热点讨论' },
    douyin: { name: '抖音', description: '热点榜单' },
  };
  
  const info = platformInfo[platformId] || { name: '未知平台', description: '热门内容' };
  
  return {
    id: platformId,
    name: info.name,
    description: info.description,
    icon: platformId,
    last_updated: new Date().toISOString(),
    news: generateRandomNewsItems(10, platformId),
  };
}; 