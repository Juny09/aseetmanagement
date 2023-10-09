import Head from 'next/head';
import Table from './Table';
import CycleTime from './CycleTime';
import Charts from './Chart';
import Nav from './Nav';

export default function Home() {
  return (
    <main className="bg-dark-500 min-h-screen">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="text-white">
        <Nav />
      </div>
      <div className="container mx-auto p-2">
        <div className="box-border u-margin-16 u-padding-block-12">
          <CycleTime />
          <div className="flex flex-col md:flex-row lg:flex-row">
            <div className="w-full md:w-30 lg:w-30 p-1">
              <Charts />
            </div>
            <div className="w-full md:w-70 lg:w-70 text-m">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
