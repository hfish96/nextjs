'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { watchlistApi } from '../api';

/**
 * 获取自选股列表Hook
 * @param {Object} options - 查询选项
 * @returns {Object} 自选股列表数据和状态
 */
export function useWatchlist(options = {}) {
  const [watchlist, setWatchlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 使用useRef保存options，避免无限重渲染
  const optionsRef = useRef(options);
  const optionsJSON = JSON.stringify(options);
  
  // 只有当options实际内容变化时，才更新ref
  useEffect(() => {
    optionsRef.current = JSON.parse(optionsJSON);
  }, [optionsJSON]);
  
  const fetchWatchlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await watchlistApi.getWatchlist(optionsRef.current);
      setWatchlist(data);
    } catch (err) {
      console.error('获取自选股失败:', err);
      setError(err.message || '获取自选股失败');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist, optionsJSON]);
  
  // 添加股票到自选列表
  const addStock = async (stockCode) => {
    try {
      await watchlistApi.addToWatchlist(stockCode);
      // 刷新列表
      fetchWatchlist();
      return true;
    } catch (err) {
      console.error('添加自选股失败:', err);
      throw err;
    }
  };
  
  // 从自选列表移除股票
  const removeStock = async (stockId) => {
    try {
      await watchlistApi.removeFromWatchlist(stockId);
      // 刷新列表
      fetchWatchlist();
      return true;
    } catch (err) {
      console.error('移除自选股失败:', err);
      throw err;
    }
  };
  
  // 设置股票价格提醒
  const setAlert = async (stockId, alertSettings) => {
    try {
      const result = await watchlistApi.setStockAlert(stockId, alertSettings);
      // 刷新列表
      fetchWatchlist();
      return result;
    } catch (err) {
      console.error('设置股票提醒失败:', err);
      throw err;
    }
  };
  
  return { 
    watchlist, 
    loading, 
    error, 
    refresh: fetchWatchlist, 
    addStock, 
    removeStock, 
    setAlert 
  };
}

/**
 * 获取股票详情Hook
 * @param {string} stockId - 股票ID
 * @returns {Object} 股票详情数据和状态
 */
export function useStockDetails(stockId) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchDetails = useCallback(async () => {
    if (!stockId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await watchlistApi.getStockDetails(stockId);
      setDetails(data);
    } catch (err) {
      console.error(`获取股票(${stockId})详情失败:`, err);
      setError(err.message || '获取股票详情失败');
    } finally {
      setLoading(false);
    }
  }, [stockId]);
  
  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  
  return { 
    details, 
    loading, 
    error, 
    refresh: fetchDetails 
  };
} 