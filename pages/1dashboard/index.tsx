import Head from 'next/head'
import ContractStatus from './ContractStatus';
import Table from './Table';
import CycleTime from './CycleTime';
// import Test from './Test';
import Charts from './Chart';
import Nav from './Nav';
import "@appwrite.io/pink";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Nav />
      <div className="box u-margin-32 u-padding-block-12">

        <h1 className="heading-level-1 u-text-center">Dashboard</h1>
        
        <CycleTime />
        <Charts />
        <Table />



      </div>
    </>
  )
}