import { API_BASE_URL, DEFAULT_HEADERS, ApiError, REQUEST_TIMEOUT, AUTH_TOKEN } from './config';

/**
 * 基础API请求方法
 * @param {string} endpoint - API端点
 * @param {Object} options - 请求选项
 * @returns {Promise<any>}
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 创建AbortController用于请求超时
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  
  try {
    // 合并默认选项和传入选项
    const fetchOptions = {
      headers: { 
        ...DEFAULT_HEADERS, 
        // 添加授权头，确保所有请求都包含token
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        ...options.headers 
      },
      signal: controller.signal,
      ...options,
    };
    
    // 发送请求
    const response = await fetch(url, fetchOptions);
    
    // 清除超时计时器
    clearTimeout(timeoutId);
    
    // 获取响应数据
    const data = await response.json();
    
    // 处理错误响应
    if (!response.ok) {
      throw new ApiError(
        data.message || 'API请求失败',
        response.status,
        data
      );
    }
    
    // 检查业务逻辑错误码
    if (data.code !== 0) {
      throw new ApiError(
        data.message || '业务逻辑错误',
        response.status,
        data
      );
    }
    
    // 返回成功数据
    return data.data;
  } catch (error) {
    // 清除超时计时器
    clearTimeout(timeoutId);
    
    // 处理超时错误
    if (error.name === 'AbortError') {
      throw new ApiError('请求超时', 408, { code: 408, message: '请求超时' });
    }
    
    // 处理网络错误
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new ApiError('网络请求失败', 0, { code: 0, message: '网络请求失败' });
    }
    
    // 重新抛出其他错误
    throw error;
  }
}

/**
 * GET请求
 * @param {string} endpoint 
 * @param {Object} params 
 * @returns {Promise<any>}
 */
export function get(endpoint, params = {}) {
  // 构建查询字符串
  const queryString = Object.keys(params).length 
    ? `?${new URLSearchParams(params).toString()}`
    : '';
  
  return apiRequest(`${endpoint}${queryString}`, { method: 'GET' });
}

/**
 * POST请求
 * @param {string} endpoint 
 * @param {Object} data 
 * @returns {Promise<any>}
 */
export function post(endpoint, data = {}) {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT请求
 * @param {string} endpoint 
 * @param {Object} data 
 * @returns {Promise<any>}
 */
export function put(endpoint, data = {}) {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE请求
 * @param {string} endpoint 
 * @returns {Promise<any>}
 */
export function del(endpoint) {
  return apiRequest(endpoint, { method: 'DELETE' });
} 