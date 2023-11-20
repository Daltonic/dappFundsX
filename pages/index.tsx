import Banner from '@/components/Banner'
import Cards from '@/components/Cards'
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
    </div>
  )
}
