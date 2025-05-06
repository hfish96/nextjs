'use client';

/**
 * 错误消息组件
 * @param {Object} props - 组件属性
 * @param {string} props.message - 错误消息
 * @param {Function} [props.retry] - 重试函数
 * @param {boolean} [props.fullPage=false] - 是否全页面显示
 */
export default function ErrorMessage({ message, retry, fullPage = false }) {
  if (!message) return null;
  
  const handleRetry = () => {
    if (typeof retry === 'function') {
      retry();
    }
  };
  
  if (fullPage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-lg w-full">
          <h3 className="text-xl font-semibold text-red-400 mb-2">出错了</h3>
          <p className="text-gray-300 mb-4">{message}</p>
          {retry && (
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-md transition duration-200"
            >
              重试
            </button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-red-900/20 border border-red-500 rounded-md p-3 my-2">
      <p className="text-red-400 text-sm">{message}</p>
      {retry && (
        <button 
          onClick={handleRetry}
          className="text-xs text-red-400 hover:text-red-300 underline mt-1"
        >
          重试
        </button>
      )}
    </div>
  );
} 