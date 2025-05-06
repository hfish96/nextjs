import { get } from '../client';

/**
 * 搜索股票
 * @param {Object} params - 查询参数
 * @param {string} params.keyword - 搜索关键词
 * @param {string} [params.market='all'] - 市场过滤 (可选值: 'all', 'sh', 'sz', 'hk', 'us')
 * @param {number} [params.limit=10] - 返回条数
 * @returns {Promise<Object>} 搜索结果
 */
export function searchStocks(params) {
  // 参数检验，确保有关键词
  if (!params || !params.keyword) {
    throw new Error('搜索关键词不能为空');
  }
  
  return get('/search/stocks', params)
    .then(data => {
      // 处理可能的数据格式异常
      if (!data) {
        return { total: 0, stocks: [] };
      }
      
      // 确保stocks字段存在且为数组
      return {
        ...data,
        total: data.total || 0,
        stocks: Array.isArray(data.stocks) ? data.stocks : []
      };
    });
} 