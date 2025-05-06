'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faNewspaper } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/60 backdrop-blur-md border-b border-dark-700/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          {/* Tabs */}
          <div className="bg-dark-800/70 rounded-xl p-1 shadow-lg">
            <div className="flex">
              <Link href="/">
                <div className={`px-6 py-1.5 rounded-lg transition-all text-sm ${
                  pathname === '/' ? 'bg-primary-700 text-white' : 'text-gray-400 hover:text-gray-300'
                }`}>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faChartLine} className="mr-2 text-xs" />
                    <span>股票</span>
                  </div>
                </div>
              </Link>
              <Link href="/news">
                <div className={`px-6 py-1.5 rounded-lg transition-all text-sm ${
                  pathname === '/news' ? 'bg-primary-700 text-white' : 'text-gray-400 hover:text-gray-300'
                }`}>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faNewspaper} className="mr-2 text-xs" />
                    <span>新闻</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 