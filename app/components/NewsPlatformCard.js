'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faChevronRight, faRss } from '@fortawesome/free-solid-svg-icons';
import { faWeibo, faTiktok, faZhihu, faBilibili } from '@fortawesome/free-brands-svg-icons';

// Helper component for news item
const NewsItem = ({ item }) => {
  // 创建一个内容包装器，可以是链接或普通div
  const ContentWrapper = item.link ? 'a' : 'div';
  
  // 确定包装器需要的属性
  const wrapperProps = item.link ? {
    href: item.link,
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};
  
  return (
    <ContentWrapper 
      className="news-item py-2.5 px-4 flex items-start cursor-pointer hover:bg-white/5 hover:translate-x-1 transition-all duration-200"
      {...wrapperProps}
    >
      <span className="text-xs font-semibold bg-white bg-opacity-10 h-5 w-5 flex items-center justify-center rounded mr-3 mt-0.5">
        {item.rank}
      </span>
      <div className="flex-1 min-w-0">
        {(item.is_hot || item.is_new) ? (
          <div className="news-content flex items-center">
            <span className="news-title text-gray-200 truncate block">{item.title}</span>
            {item.is_hot && <span className="tag-hot flex-shrink-0 ml-1">热</span>}
            {item.is_new && <span className="tag-new flex-shrink-0 ml-1">新</span>}
          </div>
        ) : (
          <span className="text-gray-200 truncate block">{item.title}</span>
        )}
      </div>
    </ContentWrapper>
  );
};

export default function NewsPlatformCard({ platform, onRefresh, isLoading }) {
  // Define platform icon based on id
  const getPlatformIcon = (id) => {
    console.log(faWeibo)
    console.log(id)
    switch(id) {
      case 'weibo':
        return <FontAwesomeIcon icon={faWeibo} className="text-xl mr-2" />;
      case 'zhihu':
        return <FontAwesomeIcon icon={faZhihu} className="text-xl mr-2" />;
      case 'bilibili':
        return <FontAwesomeIcon icon={faBilibili} className="text-xl mr-2" />;
      case 'baidu':
        return <span className="flex items-center justify-center w-6 h-6 rounded-sm bg-blue-600 text-white font-bold text-xs mr-2">百度</span>;
      case 'douyin':
        return <FontAwesomeIcon icon={faTiktok} className="text-lg mr-2" />;
      case 'hupu':
        return <img src="https://w1.hoopchina.com.cn/images/pc/old/favicon.ico" alt="虎扑" className="w-6 h-6 mr-2" />;
      case 'douban':
        return <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white font-bold text-sm mr-2">豆</span>;
      default:
        return <FontAwesomeIcon icon={faRss} className="text-lg mr-2" />;
    }
  };

  // 计算头部样式
  const getHeaderClass = (id) => {
    switch(id) {
      case 'weibo': return 'from-red-700 to-red-600';
      case 'zhihu': return 'from-blue-700 to-blue-600';
      case 'baidu': return 'from-blue-700 to-blue-600';
      case 'douyin': return 'from-gray-700 to-gray-600';
      case 'hupu': return 'from-orange-700 to-orange-600';
      case 'douban': return 'from-green-700 to-green-600';
      default: return 'from-primary-700 to-primary-600';
    }
  };

  const handleRefresh = (e) => {
    e.preventDefault();
    
    // 如果已经在加载中，不重复触发
    if (isLoading) return;
    
    // 调用刷新方法，不需要手动控制动画，由isLoading状态控制
    if (typeof onRefresh === 'function') {
      onRefresh(platform.id);
    }
  };
  
  // 格式化最后更新时间
  const formatLastUpdated = (isoDate) => {
    if (!isoDate) return '刚刚更新';
    
    const lastUpdate = new Date(isoDate);
    const now = new Date();
    const diffMinutes = Math.floor((now - lastUpdate) / (1000 * 60));
    
    if (diffMinutes < 1) return '刚刚更新';
    if (diffMinutes < 60) return `${diffMinutes}分钟前更新`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}小时前更新`;
    
    return `${Math.floor(diffHours / 24)}天前更新`;
  };
  
  // 获取平台官方热榜URL
  const getPlatformUrl = (id) => {
    switch(id) {
      case 'weibo':
        return 'https://weibo.com/hot/search';
      case 'zhihu':
        return 'https://www.zhihu.com/hot';
      case 'baidu':
        return 'https://top.baidu.com/board?platform=pc&sa=pcindex_entry';
      case 'douyin':
        return 'https://www.douyin.com/?recommend=1';
      default:
        return '#';
    }
  };
  
  return (
    <div className="morph-card bg-dark-800 rounded-xl overflow-hidden border border-dark-700/50">
      {/* 卡片头部 */}
      <div className={`py-3 px-4 bg-gradient-to-r ${getHeaderClass(platform.id)}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {getPlatformIcon(platform.id)}
            <div>
              <h3 className="font-bold text-white">{platform.name}</h3>
              <p className="text-xs text-gray-200 opacity-80">{platform.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-200">
            <span className="text-xs opacity-70">{formatLastUpdated(platform.last_updated)}</span>
            <button 
              className="p-1.5 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <FontAwesomeIcon 
                icon={faSyncAlt} 
                className={isLoading ? 'animate-spin' : ''} 
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* 新闻列表 */}
      <div className={`news-list py-2 overflow-y-auto overflow-x-hidden ${isLoading ? 'opacity-50' : ''}`}>
        {platform.news.map((newsItem) => (
          <NewsItem key={`${platform.id}-${newsItem.rank}`} item={newsItem} />
        ))}
      </div>
      
      {/* 卡片底部 */}
      <div className="px-4 py-3 bg-dark-700/30 flex justify-center">
        <Link 
          href={getPlatformUrl(platform.id)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          查看更多 <FontAwesomeIcon icon={faChevronRight} className="text-xs ml-1" />
        </Link>
      </div>
    </div>
  );
} 