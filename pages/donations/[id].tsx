import Details from '@/components/Details'
import Donors from '@/components/Donors'
import NavBtn from '@/components/NavBtn'
import Payment from '@/components/Payment'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Donation() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>Charity Name</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
      <Donors />
      <NavBtn donationId={Number(id)} />
    </div>
  )
}
