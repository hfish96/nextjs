import Navbar from './components/Navbar';
import MarketIndex from './components/MarketIndex';
import WatchlistTable from './components/WatchlistTable';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <MarketIndex />
        <WatchlistTable />
      </main>
    </>
  );
}
