import Delete from '@/components/Delete'
import Details from '@/components/Details'
import Supports from '@/components/Supports'
import NavBtn from '@/components/NavBtn'
import Payment from '@/components/Payment'
import { CharityStruct, RootState, SupportStruct } from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Donor from '@/components/Donor'
import Ban from '@/components/Ban'
import { generateCharities, generateSupports } from '@/utils/fakeData'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/globalSlices'

interface PageProps {
  charityData: CharityStruct
  supportsData: SupportStruct[]
}

const Page: NextPage<PageProps> = ({ charityData, supportsData }) => {
  const { charity, supports } = useSelector((states: RootState) => states.globalStates)

  const { setCharity, setSupports } = globalActions
  const dispatch = useDispatch()

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    dispatch(setCharity(charityData))
    dispatch(setSupports(supportsData))
  }, [dispatch, setCharity, charityData, setSupports, supportsData])

  return (
    <div>
      <Head>
        <title>Charity | {charity?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>

      {charity && (
        <div
          className="flex flex-col sm:flex-row sm:justify-between items-start
          lg:w-2/3 w-full mx-auto space-y-4 sm:space-y-0 sm:space-x-10 my-10 px-8 sm:px-0"
        >
          <Details supports={supports} charity={charity} />
          <Payment supports={supports.slice(0, 4)} charity={charity} />
        </div>
      )}

      {charity && (
        <>
          <Delete charity={charity} />
          <Donor charity={charity} />
          <Ban charity={charity} />
          <Supports supports={supports} />
          <NavBtn owner={charity?.owner} donationId={Number(id)} />
        </>
      )}
    </div>
  )
}

export default Page

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query

  const charityData: CharityStruct = generateCharities(Number(id))[0]
  const supportsData: SupportStruct[] = generateSupports(7)

  return {
    props: {
      charityData: JSON.parse(JSON.stringify(charityData)),
      supportsData: JSON.parse(JSON.stringify(supportsData)),
    },
  }
}
