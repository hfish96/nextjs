'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faSyncAlt, faMoon, faBars } from '@fortawesome/free-solid-svg-icons';

export default function NewsNavbar() {
  // For the refresh button animation
  const handleRefresh = (e) => {
    const button = e.currentTarget.querySelector('.fa-sync-alt');
    if (button) {
      button.classList.add('animate-spin');
      setTimeout(() => {
        button.classList.remove('animate-spin');
      }, 1000);
    }
  };

  return (
    <nav className="bg-dark-800/80 backdrop-blur-sm shadow-md border-b border-dark-600/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 text-white mr-3">
              <FontAwesomeIcon icon={faNewspaper} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-200 tracking-tight">NewsNow</span>
              <span className="text-xs text-gray-500">v1.0.0</span>
            </div>
          </div>
          
          {/* 导航菜单 */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="#" 
              className="px-3 py-2 text-sm font-medium rounded-lg text-white bg-dark-500 hover:bg-dark-400 transition-all duration-200"
            >
              最热
            </Link>
            <Link 
              href="#" 
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-dark-700 transition-all duration-200"
            >
              实时
            </Link>
            <Link 
              href="#" 
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-dark-700 transition-all duration-200"
            >
              关注
            </Link>
            <Link 
              href="#" 
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-dark-700 transition-all duration-200"
            >
              更多
            </Link>
          </div>
          
          {/* 主题切换和刷新按钮 */}
          <div className="flex items-center space-x-2">
            <button 
              className="morph-button p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-400"
              onClick={handleRefresh}
            >
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
            <button className="morph-button p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-400">
              <FontAwesomeIcon icon={faMoon} />
            </button>
            
            {/* 移动端菜单按钮 */}
            <button className="md:hidden morph-button p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-400">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 