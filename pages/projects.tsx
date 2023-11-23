import Banner from '@/components/Banner'
import Cards from '@/components/Cards'
import NavBtn from '@/components/NavBtn'
import { getMyCharities } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { CharityStruct, RootState } from '@/utils/type.dt'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page: NextPage = () => {
  const { charities } = useSelector((states: RootState) => states.globalStates)
  const dispatch = useDispatch()
  const { setCharities } = globalActions

  useEffect(() => {
    const fetchCharities = async () => {
      const charitiesData: CharityStruct[] = await getMyCharities()
      dispatch(setCharities(charitiesData))
    }

    fetchCharities()
  }, [dispatch, setCharities])

  return (
    <div>
      <Head>
        <title>Charity Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner mine />
      <div className="h-10"></div>
      <Cards charities={charities} />
      <div className="h-10"></div>
      <NavBtn />
    </div>
  )
}

export default Page

export const getServerSideProps = async () => {
  const charitiesData: CharityStruct[] = await getMyCharities()
  return {
    props: { charitiesData: JSON.parse(JSON.stringify(charitiesData)) },
  }
}
