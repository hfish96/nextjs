'use client';

/**
 * 加载中组件
 * @param {Object} props - 组件属性
 * @param {string} [props.size='md'] - 尺寸 (sm, md, lg)
 * @param {string} [props.text] - 加载文本
 * @param {boolean} [props.fullPage=false] - 是否全页面显示
 */
export default function Loading({ size = 'md', text, fullPage = false }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3'
  };
  
  const spinner = (
    <div className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-t-transparent border-blue-500 animate-spin`}></div>
  );
  
  if (fullPage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        {spinner}
        {text && <p className="mt-4 text-gray-400">{text}</p>}
      </div>
    );
  }
  
  if (text) {
    return (
      <div className="flex items-center justify-center py-4">
        {spinner}
        <span className="ml-3 text-gray-400">{text}</span>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center py-4">
      {spinner}
    </div>
  );
} 