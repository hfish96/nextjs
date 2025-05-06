'use client';
import Image from 'next/image';
import './MarketIndex.css';
import { useMarketIndices } from '../hooks';
import Loading from './ui/Loading';
import ErrorMessage from './ui/ErrorMessage';

export default function MarketIndex() {
  const { indices, loading, error, refresh } = useMarketIndices();

  if (loading) {
    return <Loading text="加载市场指数中..." />;
  }

  if (error) {
    return <ErrorMessage message={error} retry={refresh} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {indices.map((index) => (
        <div 
          key={index.id}
          className="morph-card group bg-dark-800 rounded-2xl p-4 border border-dark-700 relative overflow-hidden hover:bg-gradient-to-br hover:from-dark-700 hover:to-dark-800"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">{index.name}</h3>
              <p className="text-sm text-gray-500">{index.eng_name}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-200">{index.value}</p>
              <p className={`text-sm ${index.is_positive ? 'text-accent-green' : 'text-accent-red'}`}>
                {index.change_value} ({index.change_percentage})
              </p>
            </div>
          </div>
          <div className={`h-32 w-full mt-2 chart-container ${index.is_positive ? 'chart-up' : 'chart-down'}`}>
            <img
              src={index.chart_data?.chart_svg || '/svg/default-chart.svg'}
              alt={`${index.name}走势图`}
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-primary-700 opacity-5 rounded-full group-hover:opacity-10 transition-all duration-500"></div>
        </div>
      ))}
    </div>
  );
} 