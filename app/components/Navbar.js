'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faSearch, faGear, faBars, faNewspaper } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav className="bg-dark-800 shadow-md border-b border-dark-600 relative z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 text-white mr-3">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <span className="text-xl font-semibold text-gray-200 tracking-tight">简约股票</span>
          </div>
          
          {/* 搜索框 (随交互扩展) */}
          <div className="relative group">
            <div className="relative transition-all duration-300 ease-in-out w-40 group-hover:w-64 group-focus-within:w-64">
              <input 
                type="text" 
                placeholder="搜索股票代码或名称..." 
                className="w-full py-2 pl-10 pr-4 text-sm text-gray-300 bg-dark-700 rounded-xl border border-dark-500 focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </div>
            </div>
          </div>
          
          {/* 导航项 */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/"
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-dark-700 transition-all duration-200"
            >
              首页
            </Link>
            <Link 
              href="/news"
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-dark-700 transition-all duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faNewspaper} className="mr-1" />
              热点资讯
            </Link>
            <Link 
              href="#" 
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-dark-700 transition-all duration-200"
            >
              帮助
            </Link>
            <Link 
              href="#" 
              className="morph-button px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg hover:from-primary-500 hover:to-primary-600"
            >
              <FontAwesomeIcon icon={faGear} className="mr-1" />
              设置
            </Link>
          </div>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button className="morph-button p-2 rounded-lg bg-dark-700 hover:bg-dark-600">
              <FontAwesomeIcon icon={faBars} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 