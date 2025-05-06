'use client';

import NewsPlatformCard from '../components/NewsPlatformCard';
import { useHotlists } from '../hooks';
import Loading from '../components/ui/Loading';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function NewsPage() {
  const { hotlists, loading, error, refresh, refreshPlatform, loadingPlatforms } = useHotlists();

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-6">
        <Loading fullPage text="加载热点数据中..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-6">
        <ErrorMessage message={error} retry={refresh} fullPage />
      </main>
    );
  }

  // 检查hotlists是否是数组，如果不是则显示错误信息
  const platformList = Array.isArray(hotlists) ? hotlists : [];
  
  if (platformList.length === 0) {
    return (
      <main className="container mx-auto px-4 py-6">
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-300 mb-4">暂无热点数据</h3>
          <button 
            onClick={refresh}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-md transition duration-200"
          >
            刷新
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        {/* 平台热榜卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformList.map(platform => (
            <NewsPlatformCard 
              key={platform.id} 
              platform={platform}
              isLoading={!!loadingPlatforms[platform.id]}
              onRefresh={() => {
                // 仅刷新单个平台
                return refreshPlatform(platform.id);
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
} 