import MarketIndex from './components/MarketIndex';
import WatchlistTable from './components/WatchlistTable';

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <MarketIndex />
        <WatchlistTable />
      </main>
    </>
  );
}
