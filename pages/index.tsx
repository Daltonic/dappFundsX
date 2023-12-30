import Banner from '@/components/Banner'
import Cards from '@/components/Cards'
import NavBtn from '@/components/NavBtn'
import Quote from '@/components/Quote'
import Start from '@/components/Start'
import { getCharities } from '@/services/blockchain'
import { CharityStruct } from '@/utils/type.dt'
import { NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage<{ charitiesData: CharityStruct[] }> = ({ charitiesData }) => {
  return (
    <div>
      <Head>
        <title>Charity Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <div className="h-10"></div>
      <Cards charities={charitiesData} />
      <div className="h-10"></div>
      <Quote />
      <div className="h-10"></div>
      <Start />
      <div className="h-10"></div>
      <NavBtn />
    </div>
  )
}

export default Page

export const getServerSideProps = async () => {
  const charitiesData: CharityStruct[] = await getCharities()
  return {
    props: { charitiesData: JSON.parse(JSON.stringify(charitiesData)) },
  }
}
