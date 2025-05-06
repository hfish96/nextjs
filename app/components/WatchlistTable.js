'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCaretUp, faCaretDown, faBell, faChartLine, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useWatchlist } from '../hooks';
import Loading from './ui/Loading';
import ErrorMessage from './ui/ErrorMessage';

export default function WatchlistTable() {
  const { watchlist, loading, error, refresh, addStock, removeStock, setAlert } = useWatchlist();
  const [activeRow, setActiveRow] = useState(null);

  const handleRowClick = (id, e) => {
    if (!e.target.closest('button')) {
      setActiveRow(activeRow === id ? null : id);
    }
  };

  const handleAddStock = () => {
    // 实际应用中应该弹出添加自选股的对话框
    const stockCode = prompt('请输入要添加的股票代码:');
    if (stockCode) {
      addStock(stockCode).catch(err => {
        alert(`添加失败: ${err.message}`);
      });
    }
  };

  const handleRemoveStock = (stockId, e) => {
    e.stopPropagation();
    if (confirm('确定要删除此自选股吗?')) {
      removeStock(stockId).catch(err => {
        alert(`删除失败: ${err.message}`);
      });
    }
  };

  if (loading) {
    return <Loading text="加载自选股列表中..." />;
  }

  if (error) {
    return <ErrorMessage message={error} retry={refresh} />;
  }

  const stocks = watchlist?.stocks || [];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-200">我的自选股</h2>
        <div className="flex space-x-2">
          {/* 添加按钮悬停时变形 */}
          <button 
            className="morph-button group py-2 px-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white rounded-lg text-sm transition-all duration-300 flex items-center"
            onClick={handleAddStock}
          >
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
            {stocks.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  暂无自选股，请点击添加按钮添加
                </td>
              </tr>
            ) : (
              stocks.map((stock) => (
                <tr 
                  key={stock.id}
                  className={`border-t border-dark-700 hover:bg-dark-700/50 transition-colors duration-200 group relative ${activeRow === stock.id ? 'bg-dark-700' : ''}`}
                  onClick={(e) => handleRowClick(stock.id, e)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-200">{stock.name}</div>
                      {stock.is_frequent && (
                        <span className="ml-2 px-2 py-0.5 bg-primary-700/30 text-primary-500 text-xs rounded-full">常用</span>
                      )}
                      {stock.is_surging && (
                        <span className="ml-2 px-2 py-0.5 bg-accent-red/20 text-accent-red text-xs rounded-full">大幅波动</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{stock.code}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-200">{stock.price}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`flex items-center justify-end ${stock.change_direction === 'up' ? 'text-accent-green' : 'text-accent-red'}`}>
                      <FontAwesomeIcon icon={stock.change_direction === 'up' ? faCaretUp : faCaretDown} className="mr-1" />
                      {stock.change_percent}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-400">{stock.volume}</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-400">{stock.market_cap}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        className="p-1.5 text-primary-400 hover:text-primary-300 transition-colors duration-200" 
                        title="设置提醒"
                        onClick={(e) => {
                          e.stopPropagation();
                          // 实际应用中应该弹出设置提醒的对话框
                          alert('设置提醒功能将在未来版本开放');
                        }}
                      >
                        <FontAwesomeIcon icon={faBell} />
                      </button>
                      <button 
                        className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors duration-200" 
                        title="查看详情"
                        onClick={(e) => {
                          e.stopPropagation();
                          // 实际应用中应该跳转到股票详情页
                          alert('查看详情功能将在未来版本开放');
                        }}
                      >
                        <FontAwesomeIcon icon={faChartLine} />
                      </button>
                      <button 
                        className="p-1.5 text-accent-red hover:text-accent-red/80 transition-colors duration-200" 
                        title="删除"
                        onClick={(e) => handleRemoveStock(stock.id, e)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 