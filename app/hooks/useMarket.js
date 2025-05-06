'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { marketApi } from '../api';

/**
 * 获取市场指数数据Hook
 * @returns {Object} 市场指数数据和状态
 */
export function useMarketIndices() {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchIndices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await marketApi.getMarketIndices();
      setIndices(data);
    } catch (err) {
      console.error('获取市场指数失败:', err);
      setError(err.message || '获取市场指数失败');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchIndices();
  }, [fetchIndices]);
  
  // 提供刷新方法
  const refresh = () => {
    fetchIndices();
  };
  
  return { indices, loading, error, refresh };
}

/**
 * 获取指数历史数据Hook
 * @param {string} indexId - 指数ID
 * @param {Object} options - 查询选项
 * @returns {Object} 指数历史数据和状态
 */
export function useIndexHistory(indexId, options = {}) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 使用useRef保存options，避免无限重渲染
  const optionsRef = useRef(options);
  const optionsJSON = JSON.stringify(options);
  
  // 只有当options实际内容变化时，才更新ref
  useEffect(() => {
    optionsRef.current = JSON.parse(optionsJSON);
  }, [optionsJSON]);
  
  const fetchHistory = useCallback(async () => {
    if (!indexId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await marketApi.getIndexHistory(indexId, optionsRef.current);
      setHistory(data);
    } catch (err) {
      console.error(`获取指数(${indexId})历史数据失败:`, err);
      setError(err.message || '获取指数历史数据失败');
    } finally {
      setLoading(false);
    }
  }, [indexId]);
  
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory, optionsJSON]);
  
  // 提供刷新方法
  const refresh = () => {
    fetchHistory();
  };
  
  // 提供更新时间段的方法
  const updatePeriod = (newPeriod) => {
    const newOptions = { ...optionsRef.current, period: newPeriod };
    optionsRef.current = newOptions; // 直接更新ref
    setHistory(null);
    return marketApi.getIndexHistory(indexId, newOptions)
      .then(data => {
        setHistory(data);
        return data;
      });
  };
  
  // 提供更新时间间隔的方法
  const updateInterval = (newInterval) => {
    const newOptions = { ...optionsRef.current, interval: newInterval };
    optionsRef.current = newOptions; // 直接更新ref
    setHistory(null);
    return marketApi.getIndexHistory(indexId, newOptions)
      .then(data => {
        setHistory(data);
        return data;
      });
  };
  
  return { 
    history, 
    loading, 
    error, 
    refresh, 
    updatePeriod, 
    updateInterval 
  };
} 