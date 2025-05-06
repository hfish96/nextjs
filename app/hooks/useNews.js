'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { newsApi } from '../api';

/**
 * 获取所有平台热点Hook
 * @param {Object} options - 查询选项
 * @returns {Object} 热点数据和状态
 */
export function useHotlists(options = {}) {
  const [hotlists, setHotlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 增加平台加载状态
  const [loadingPlatforms, setLoadingPlatforms] = useState({});
  
  // 使用useRef保存options，避免无限重渲染
  const optionsRef = useRef(options);
  const optionsJSON = JSON.stringify(options);
  
  // 只有当options实际内容变化时，才更新ref
  useEffect(() => {
    const newOptions = JSON.parse(optionsJSON);
    optionsRef.current = newOptions;
  }, [optionsJSON]);
  
  const fetchHotlists = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsApi.getAllHotlists(optionsRef.current);
      // API模块已经处理了数据格式，这里无需再做格式判断
      setHotlists(data || []);
    } catch (err) {
      console.error('获取热点列表失败:', err);
      setError(err.message || '获取热点列表失败');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // 添加刷新单个平台的函数
  const refreshPlatform = useCallback(async (platformId) => {
    // 如果没有指定平台ID，刷新所有平台
    if (!platformId) {
      return fetchHotlists();
    }
    
    try {
      // 设置特定平台的加载状态
      setLoadingPlatforms(prev => ({ ...prev, [platformId]: true }));
      
      // 尝试从API获取最新数据
      let newPlatformData;
      
      try {
        // 尝试从API获取数据，添加refresh=true参数以绕过缓存
        newPlatformData = await newsApi.getPlatformHotlist(platformId, { refresh: true });
      } catch (apiError) {
        console.warn(`API获取平台(${platformId})数据失败，使用模拟数据:`, apiError);
        
        // 如果API调用失败，使用本地模拟数据
        // 动态导入模拟数据模块(避免在生产环境中加载)
        const { refreshPlatformData } = await import('../utils/mockData');
        newPlatformData = refreshPlatformData(platformId);
      }
      
      // 更新平台数据
      if (newPlatformData) {
        setHotlists(currentHotlists => {
          // 创建新数组，替换特定平台的数据
          return currentHotlists.map(platform => 
            platform.id === platformId ? newPlatformData : platform
          );
        });
      }
      
      return newPlatformData;
    } catch (err) {
      console.error(`刷新平台(${platformId})失败:`, err);
      // 不设置全局错误，只返回特定平台的错误
      return Promise.reject(err);
    } finally {
      // 重置特定平台的加载状态
      setLoadingPlatforms(prev => ({ ...prev, [platformId]: false }));
    }
  }, [fetchHotlists]);
  
  useEffect(() => {
    fetchHotlists();
    // 使用JSON字符串作为依赖，只有当options实际改变时才重新请求
  }, [fetchHotlists, optionsJSON]);
  
  return { 
    hotlists, 
    loading, 
    error, 
    refresh: fetchHotlists,
    refreshPlatform,
    // 添加平台加载状态，供组件判断特定平台是否正在加载
    loadingPlatforms
  };
}

/**
 * 获取指定平台热点Hook
 * @param {string} platformId - 平台ID
 * @param {Object} options - 查询选项
 * @returns {Object} 平台热点数据和状态
 */
export function usePlatformHotlist(platformId, options = {}) {
  const [hotlist, setHotlist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 使用useRef保存options
  const optionsRef = useRef(options);
  const optionsJSON = JSON.stringify(options);
  
  // 只有当options实际内容变化时，才更新ref
  useEffect(() => {
    optionsRef.current = JSON.parse(optionsJSON);
  }, [optionsJSON]);
  
  const fetchHotlist = useCallback(async () => {
    if (!platformId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await newsApi.getPlatformHotlist(platformId, optionsRef.current);
      setHotlist(data);
    } catch (err) {
      console.error(`获取平台(${platformId})热点失败:`, err);
      setError(err.message || '获取平台热点失败');
    } finally {
      setLoading(false);
    }
  }, [platformId]);
  
  useEffect(() => {
    fetchHotlist();
  }, [fetchHotlist, optionsJSON]);
  
  return { 
    hotlist, 
    loading, 
    error, 
    refresh: fetchHotlist 
  };
}

/**
 * 获取金融新闻Hook
 * @param {Object} options - 查询选项
 * @returns {Object} 金融新闻数据和状态
 */
export function useFinanceNews(options = {}) {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 使用useRef保存options
  const optionsRef = useRef(options);
  const optionsJSON = JSON.stringify(options);
  
  // 只有当options实际内容变化时，才更新ref
  useEffect(() => {
    optionsRef.current = JSON.parse(optionsJSON);
  }, [optionsJSON]);
  
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsApi.getFinanceNews(optionsRef.current);
      setNews(data);
    } catch (err) {
      console.error('获取金融新闻失败:', err);
      setError(err.message || '获取金融新闻失败');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchNews();
  }, [fetchNews, optionsJSON]);
  
  // 切换新闻类别
  const changeCategory = (category) => {
    const newOptions = { ...optionsRef.current, category };
    optionsRef.current = newOptions; // 直接更新ref
    setNews(null);
    return newsApi.getFinanceNews(newOptions)
      .then(data => {
        setNews(data);
        return data;
      });
  };
  
  // 加载更多/翻页
  const loadMore = () => {
    if (!news) return Promise.reject('无法加载更多');
    
    const nextPage = (optionsRef.current.page || 1) + 1;
    const newOptions = { ...optionsRef.current, page: nextPage };
    optionsRef.current = newOptions; // 直接更新ref
    
    return newsApi.getFinanceNews(newOptions)
      .then(data => {
        // 合并新闻数据
        setNews({
          ...data,
          news: [...(news.news || []), ...(data.news || [])]
        });
        return data;
      });
  };
  
  return { 
    news, 
    loading, 
    error, 
    refresh: fetchNews,
    changeCategory,
    loadMore
  };
} 