'use client';

import { useState, useCallback } from 'react';
import { searchApi } from '../api';

/**
 * 搜索股票Hook
 * @returns {Object} 搜索方法和状态
 */
export function useStockSearch() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 搜索方法
  const search = useCallback(async (keyword, options = {}) => {
    if (!keyword || keyword.trim() === '') {
      setError('请输入搜索关键词');
      return null;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const searchParams = {
        keyword,
        ...options
      };
      
      const data = await searchApi.searchStocks(searchParams);
      setResults(data);
      return data;
    } catch (err) {
      console.error('搜索股票失败:', err);
      setError(err.message || '搜索股票失败');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // 清除搜索结果
  const clearResults = () => {
    setResults(null);
    setError(null);
  };
  
  return {
    search,
    results,
    loading,
    error,
    clearResults
  };
} 