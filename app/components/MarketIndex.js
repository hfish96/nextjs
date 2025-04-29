'use client';
import Image from 'next/image';
import './MarketIndex.css';

export default function MarketIndex() {
  const marketIndices = [
    {
      id: 1,
      name: '上证指数',
      engName: 'SSE Composite Index',
      value: '3,256.29',
      changeValue: '+12.31',
      changePercentage: '+0.38%',
      isPositive: true,
      chartSvg: '/svg/shanghai-index.svg'
    },
    {
      id: 2,
      name: '深证成指',
      engName: 'SZSE Component Index',
      value: '10,762.01',
      changeValue: '-23.15',
      changePercentage: '-0.21%',
      isPositive: false,
      chartSvg: '/svg/shenzhen-index.svg'
    },
    {
      id: 3,
      name: '创业板指',
      engName: 'ChiNext Index',
      value: '2,178.76',
      changeValue: '+5.37',
      changePercentage: '+0.25%',
      isPositive: true,
      chartSvg: '/svg/chinext-index.svg'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {marketIndices.map((index) => (
        <div 
          key={index.id}
          className="morph-card group bg-dark-800 rounded-2xl p-4 border border-dark-700 relative overflow-hidden hover:bg-gradient-to-br hover:from-dark-700 hover:to-dark-800"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">{index.name}</h3>
              <p className="text-sm text-gray-500">{index.engName}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-200">{index.value}</p>
              <p className={`text-sm ${index.isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                {index.changeValue} ({index.changePercentage})
              </p>
            </div>
          </div>
          <div className={`h-32 w-full mt-2 chart-container ${index.isPositive ? 'chart-up' : 'chart-down'}`}>
            <img
              src={index.chartSvg}
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