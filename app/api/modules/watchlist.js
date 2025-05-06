import { get, post, del } from '../client';

/**
 * 获取用户的自选股列表
 * @param {Object} params - 查询参数
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.page_size=20] - 每页数量
 * @returns {Promise<Object>} 分页的自选股列表
 */
export function getWatchlist(params = {}) {
  return get('/watchlist', params)
    .then(data => {
      // 处理可能的数据格式异常
      if (!data) {
        return { total: 0, page: 1, page_size: 20, stocks: [] };
      }
      
      // 确保stocks字段存在且为数组
      return {
        ...data,
        stocks: Array.isArray(data.stocks) ? data.stocks : []
      };
    });
}

/**
 * 添加股票到自选列表
 * @param {string} stockCode - 股票代码
 * @returns {Promise<Object>} 添加结果
 */
export function addToWatchlist(stockCode) {
  return post('/watchlist', { stock_code: stockCode });
}

/**
 * 从自选列表中删除股票
 * @param {string} stockId - 股票ID
 * @returns {Promise<null>} 删除结果
 */
export function removeFromWatchlist(stockId) {
  return del(`/watchlist/${stockId}`);
}

/**
 * 为自选股设置价格提醒
 * @param {string} stockId - 股票ID
 * @param {Object} alertSettings - 提醒设置
 * @param {number} [alertSettings.price_upper] - 上限价格
 * @param {number} [alertSettings.price_lower] - 下限价格
 * @param {number} [alertSettings.change_percent_upper] - 涨幅上限
 * @param {number} [alertSettings.change_percent_lower] - 跌幅下限
 * @returns {Promise<Object>} 设置结果
 */
export function setStockAlert(stockId, alertSettings) {
  return post(`/watchlist/${stockId}/alert`, alertSettings);
}

/**
 * 获取单个股票的详细信息
 * @param {string} stockId - 股票ID
 * @returns {Promise<Object>} 股票详情
 */
export function getStockDetails(stockId) {
  return get(`/stocks/${stockId}`);
} 