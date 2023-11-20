import Banner from '@/components/Banner'
import Cards from '@/components/Cards'
import Quote from '@/components/Quote'
import Start from '@/components/Start'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Charity Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner />
      <Cards />
      <Quote />
      <Start />
    </div>
  )
}
