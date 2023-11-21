import Details from '@/components/Details'
import Donors from '@/components/Donors'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Payment from '@/components/Payment'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Charity Name</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>
      <div
        className="flex flex-col sm:flex-row sm:justify-between items-start
      lg:w-2/3 w-full mx-auto space-y-4 sm:space-y-0 sm:space-x-10 my-10 px-8 sm:px-0"
      >
        <Details />
        <Payment />
      </div>
      <Footer />
      <Donors />
    </div>
  )
}
