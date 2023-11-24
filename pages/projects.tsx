import Banner from '@/components/Banner'
import Cards from '@/components/Cards'
import NavBtn from '@/components/NavBtn'
import { generateCharities } from '@/utils/fakeData'
import { CharityStruct } from '@/utils/type.dt'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Page: NextPage = () => {
  const [charities, setCharities] = useState<CharityStruct[] | null>(null)

  useEffect(() => {
    const fetchCharities = async () => {
      const charitiesData: CharityStruct[] = generateCharities(5)
      setCharities(charitiesData)
    }

    fetchCharities()
  }, [])

  return (
    <div>
      <Head>
        <title>Charity Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner mine />
      <div className="h-10"></div>
      {charities && <Cards charities={charities} />}
      <div className="h-10"></div>
      <NavBtn />
    </div>
  )
}

export default Page
