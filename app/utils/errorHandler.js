'use client';

import { ApiError } from '../api/config';

/**
 * 全局错误处理函数
 * @param {Error} error - 错误对象
 * @returns {string} 格式化后的错误消息
 */
export function handleError(error) {
  console.error('[错误]:', error);
  
  if (error instanceof ApiError) {
    // API响应错误
    if (error.status === 401) {
      // 未授权，可能需要登录
      return '您需要登录以访问此功能';
    } else if (error.status === 403) {
      // 权限不足
      return '您没有权限执行此操作';
    } else if (error.status === 404) {
      // 资源不存在
      return '请求的资源不存在';
    } else if (error.status >= 500) {
      // 服务器错误
      return '服务器发生错误，请稍后再试';
    }
    
    // 返回API错误消息
    return error.message || '请求失败';
  } else if (error.name === 'AbortError') {
    // 请求超时
    return '请求超时，请检查您的网络连接';
  } else if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
    // 网络错误
    return '无法连接到服务器，请检查您的网络连接';
  }
  
  // 其他错误
  return error.message || '发生未知错误';
}

/**
 * 错误状态处理组件属性
 * @param {Object} props - 组件属性
 * @param {Error} props.error - 错误对象
 * @param {Function} props.retry - 重试函数
 * @returns {Object} 格式化的错误信息和处理方法
 */
export function useErrorHandling({ error, retry }) {
  if (!error) return { hasError: false };
  
  const errorMessage = handleError(error);
  const isAuthError = error instanceof ApiError && error.status === 401;
  const isServerError = error instanceof ApiError && error.status >= 500;
  
  return {
    hasError: true,
    errorMessage,
    isAuthError,
    isServerError,
    retry: retry || (() => console.log('No retry function provided'))
  };
} 