import Banner from '@/components/Banner'
import Cards from '@/components/Cards'
import NavBtn from '@/components/NavBtn'
import Head from 'next/head'

export default function Projects() {
  return (
    <div>
      <Head>
        <title>Charity Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner mine />
      <div className="h-10"></div>
      <Cards />
      <div className="h-10"></div>
      <NavBtn />
    </div>
  )
}
