'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpWideShort, faPlus, faCaretUp, faCaretDown, faBell, faChartLine, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function WatchlistTable() {
  const [stocks, setStocks] = useState([
    {
      id: 1,
      name: '阿里巴巴',
      code: '09988.HK / BABA.US',
      price: '86.95',
      changePercent: '1.47%',
      changeDirection: 'up',
      volume: '1243万',
      marketCap: '1.78万亿',
      isFrequent: true,
      isSurging: false
    },
    {
      id: 2,
      name: '腾讯控股',
      code: '00700.HK',
      price: '348.60',
      changePercent: '2.74%',
      changeDirection: 'down',
      volume: '1056万',
      marketCap: '3.34万亿',
      isFrequent: false,
      isSurging: true
    },
    {
      id: 3,
      name: '比亚迪',
      code: '002594.SZ / 01211.HK',
      price: '248.76',
      changePercent: '1.32%',
      changeDirection: 'up',
      volume: '952万',
      marketCap: '7245亿',
      isFrequent: false,
      isSurging: false
    },
    {
      id: 4,
      name: '美团',
      code: '03690.HK',
      price: '92.85',
      changePercent: '0.60%',
      changeDirection: 'up',
      volume: '784万',
      marketCap: '5629亿',
      isFrequent: false,
      isSurging: false
    }
  ]);

  const [activeRow, setActiveRow] = useState(null);

  const handleRowClick = (id, e) => {
    if (!e.target.closest('button')) {
      setActiveRow(activeRow === id ? null : id);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-200">我的自选股</h2>
        <div className="flex space-x-2">
          {/* 形态变化控制按钮 - 悬停时扩展为排序控件 */}
          <button className="morph-control flex items-center py-2 px-3 bg-dark-700 rounded-lg text-sm border border-dark-600 hover:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600/20 transition-all duration-200">
            <FontAwesomeIcon icon={faArrowUpWideShort} className="text-gray-500" />
            <span className="control-expanded text-gray-400">排序方式</span>
          </button>
          
          {/* 添加按钮悬停时变形 */}
          <button className="morph-button group py-2 px-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white rounded-lg text-sm transition-all duration-300 flex items-center">
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-1">添加</span>
          </button>
        </div>
      </div>
      
      {/* 自选股表格 */}
      <div className="overflow-x-auto">
        <table className="w-full bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
          <thead>
            <tr className="bg-dark-700 text-left">
              <th className="px-4 py-3 text-sm font-medium text-gray-400">股票名称</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400">代码</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400 text-right">最新价</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400 text-right">涨跌幅</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400 text-right">成交量</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400 text-right">市值</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr 
                key={stock.id}
                className={`border-t border-dark-700 hover:bg-dark-700/50 transition-colors duration-200 group relative ${activeRow === stock.id ? 'bg-dark-700' : ''}`}
                onClick={(e) => handleRowClick(stock.id, e)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="font-medium text-gray-200">{stock.name}</div>
                    {stock.isFrequent && (
                      <span className="ml-2 px-2 py-0.5 bg-primary-700/30 text-primary-500 text-xs rounded-full">常用</span>
                    )}
                    {stock.isSurging && (
                      <span className="ml-2 px-2 py-0.5 bg-accent-red/20 text-accent-red text-xs rounded-full">大幅波动</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{stock.code}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-200">{stock.price}</td>
                <td className="px-4 py-3 text-right">
                  <span className={`flex items-center justify-end ${stock.changeDirection === 'up' ? 'text-accent-green' : 'text-accent-red'}`}>
                    <FontAwesomeIcon icon={stock.changeDirection === 'up' ? faCaretUp : faCaretDown} className="mr-1" />
                    {stock.changePercent}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-400">{stock.volume}</td>
                <td className="px-4 py-3 text-right text-sm text-gray-400">{stock.marketCap}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-1.5 text-primary-400 hover:text-primary-300 transition-colors duration-200" title="设置提醒">
                      <FontAwesomeIcon icon={faBell} />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors duration-200" title="查看详情">
                      <FontAwesomeIcon icon={faChartLine} />
                    </button>
                    <button className="p-1.5 text-accent-red hover:text-accent-red/80 transition-colors duration-200" title="删除">
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* 添加股票按钮 - 表格下方 */}
      <div className="flex justify-center mt-4">
        <button className="morph-button group py-2 px-4 bg-dark-700 hover:bg-dark-600 text-gray-400 rounded-lg text-sm transition-all duration-300 flex items-center border border-dashed border-dark-600 hover:border-primary-600">
          <FontAwesomeIcon icon={faPlus} className="text-primary-500 mr-2" />
          <span>添加自选股</span>
        </button>
      </div>
    </div>
  );
} 