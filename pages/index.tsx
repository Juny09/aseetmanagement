import Head from 'next/head';
import Table from './Table';
import CycleTime from './CycleTime';
import Charts from './Chart';
import Nav from './Nav';

export default function Home() {
  return (
    <main className="bg-dark-500 min-h-screen">
      <div className="p-4 rounded shadow-md">
        <Head>
          <title>Dashboard</title>
        </Head>
        <div className="text-white">
          <Nav />
        </div>
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-4"><CycleTime /></div>
          <div className="col-span-1">
            <div className="chart-container">
              <Charts />
            </div>
          </div>
          <div className="col-span-3">
            <div className="table-container">
              <Table data={[]} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`

        @media (max-width: 640px) {
          .table-container {
            overflow-x: auto;
            max-width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
