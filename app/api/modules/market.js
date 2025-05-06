import { get } from '../client';

/**
 * 获取主要市场指数
 * @returns {Promise<Array>} 市场指数数据数组
 */
export function getMarketIndices() {
  return get('/market/indices')
    .then(data => {
      // 处理可能的数据格式异常
      if (!data) {
        return [];
      }
      
      // 如果返回的不是数组但有indices字段，可能数据在indices字段中
      if (!Array.isArray(data) && data.indices && Array.isArray(data.indices)) {
        return data.indices;
      }
      
      // 确保返回值是数组
      return Array.isArray(data) ? data : [];
    });
}

/**
 * 获取指定市场指数的历史数据
 * @param {string} indexId - 指数ID (例如: '000001', '399001')
 * @param {Object} params - 查询参数
 * @param {string} [params.period='1d'] - 数据周期 (可选值: '1d', '5d', '1m', '3m', '6m', '1y', '5y')
 * @param {string} [params.interval='15m'] - 数据间隔 (可选值: '1m', '5m', '15m', '30m', '60m', '1d', '1w')
 * @returns {Promise<Object>} 指数历史数据
 */
export function getIndexHistory(indexId, params = {}) {
  return get(`/market/indices/${indexId}/history`, params);
} 