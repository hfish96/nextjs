import { get } from '../client';

// 导入模拟数据函数
let mockDataModule = null;

/**
 * 获取所有平台的热门话题列表
 * @param {Object} params - 查询参数
 * @param {Array<string>} [params.platforms] - 指定平台 (可选值: ['weibo', 'zhihu', 'baidu', 'douyin', 'hupu', 'douban'])
 * @returns {Promise<Array>} 平台热点数据数组
 */
export function getAllHotlists(params = {}) {
  // 如果提供了platforms数组，转换为逗号分隔的字符串
  const queryParams = { ...params };
  
  if (Array.isArray(queryParams.platforms)) {
    queryParams.platforms = queryParams.platforms.join(',');
  }
  
  return get('/news/hotlists', queryParams)
    .then(response => {
      // 检查是否有标准的后端响应格式
      if (response && response.code === 0 && response.data !== undefined) {
        return response.data;
      }
      
      // 兼容处理非标准响应
      if (response === null || response === undefined) {
        console.warn('热点数据为空');
        return [];
      }
      
      if (Array.isArray(response)) {
        return response;
      }
      
      console.warn('无法识别的热点数据格式:', response);
      return [];
    })
    .catch(async (error) => {
      console.warn('获取热点数据失败，使用模拟数据:', error);
      
      // 懒加载模拟数据模块
      if (!mockDataModule) {
        mockDataModule = await import('../../utils/mockData');
      }
      
      // 返回模拟数据
      return mockDataModule.generateMockPlatformData();
    });
}

/**
 * 获取指定平台的热门话题列表
 * @param {string} platformId - 平台ID (例如: 'weibo', 'zhihu', 'baidu')
 * @param {Object} params - 查询参数
 * @param {number} [params.limit=10] - 返回条数
 * @param {boolean} [params.refresh=false] - 是否强制刷新数据（绕过缓存）
 * @returns {Promise<Object>} 平台热点数据
 */
export function getPlatformHotlist(platformId, params = {}) {
  // 确保params是对象
  const queryParams = typeof params === 'object' ? { ...params } : {};
  
  return get(`/news/hotlists/${platformId}`, queryParams)
    .then(response => {
      // 从标准响应中提取数据
      if (response && response.code === 0 && response.data !== undefined) {
        return response.data;
      }
      return response;
    })
    .catch(async (error) => {
      console.warn(`获取平台(${platformId})热点数据失败，使用模拟数据:`, error);
      
      // 懒加载模拟数据模块
      if (!mockDataModule) {
        mockDataModule = await import('../../utils/mockData');
      }
      
      // 返回模拟数据
      return mockDataModule.refreshPlatformData(platformId);
    });
}

/**
 * 获取金融相关新闻列表
 * @param {Object} params - 查询参数
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.page_size=20] - 每页数量
 * @param {string} [params.category='all'] - 新闻类别 (可选值: 'all', 'stock', 'fund', 'forex', 'crypto')
 * @returns {Promise<Object>} 分页的新闻列表
 */
export function getFinanceNews(params = {}) {
  return get('/news/finance', params)
    .then(response => {
      // 从标准响应中提取数据
      if (response && response.code === 0 && response.data !== undefined) {
        return response.data;
      }
      return response;
    });
} 