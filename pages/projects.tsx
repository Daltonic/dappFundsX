import Banner from '@/components/Banner'
import Cards from '@/components/Cards'
import NavBtn from '@/components/NavBtn'
import { globalActions } from '@/store/globalSlices'
import { generateCharities } from '@/utils/fakeData'
import { CharityStruct, RootState } from '@/utils/type.dt'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page: NextPage<{ charitiesData: CharityStruct[] }> = ({ charitiesData }) => {
  const { charities } = useSelector((states: RootState) => states.globalStates)
  const dispatch = useDispatch()
  const { setCharities } = globalActions

  useEffect(() => {
    dispatch(setCharities(charitiesData))
  }, [dispatch, setCharities, charitiesData])

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
  const charitiesData: CharityStruct[] = generateCharities(5)
  return {
    props: { charitiesData: JSON.parse(JSON.stringify(charitiesData)) },
  }
}
