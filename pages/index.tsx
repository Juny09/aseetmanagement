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
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-4"><CycleTime /></div>
          <div className="col-span-1"><Charts /></div>
          <div className="col-span-3 ..."><Table /></div>
        </div>
        {/* <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="md:shrink-0">
                <Charts />
              </div>
              <div className="p-8">

                <p className="mt-2 text-slate-500"><Table /></p>
              </div>
            </div>
          </div> */}
      {/* <div className="container mx-auto p-2">
        <div className="box-border u-margin-16 u-padding-block-12">
          <CycleTime />
          <div className="flex flex-col md:flex-row lg:flex-row">
        
              <Charts />
      
       
              <Table />
        
          </div>
        </div>
      </div> */}

    </main>
  );
}
