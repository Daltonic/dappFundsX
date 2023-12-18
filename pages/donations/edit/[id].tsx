import NavBtn from '@/components/NavBtn'
import { getCharity, updateCharity } from '@/services/blockchain'
import { CharityParams, CharityStruct } from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'

const Page: NextPage<{ charityData: CharityStruct }> = ({ charityData }) => {
  const { address } = useAccount()
  const [charity, setCharity] = useState<CharityParams>(charityData)
  const router = useRouter()
  const { id } = router.query

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCharity((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (
      !charity.name ||
      !charity.fullname ||
      !charity.profile ||
      !charity.amount ||
      !charity.description
    )
      return

    if (!address) return toast.warning('Connect wallet first!')

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        updateCharity(charity)
          .then((tx) => {
            console.log(tx)
            router.push('/donations/' + id)
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Approve transaction...',
        success: 'Charity created successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div>
      <Head>
        <title>Charity Update</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>

      <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
        <div className="block justify-center items-center m-auto w-full sm:w-3/5">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex items-center justify-center mb-4">
              <h2>Edit Charity</h2>
            </div>

            <div className="flex justify-between items-center flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
                <input
                  className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
                  type="text"
                  name="name"
                  placeholder="Charity Name"
                  required
                  value={charity.name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
                <input
                  className="block w-full text-sm text-slate-500 bg-transparent
                  border-0 focus:outline-none focus:ring-0"
                  type="text"
                  name="fullname"
                  placeholder="Your Full Name"
                  required
                  value={charity.fullname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
              <input
                className="block w-full text-sm text-slate-500 bg-transparent
                border-0 focus:outline-none focus:ring-0"
                type="number"
                step={0.01}
                min={0.01}
                name="amount"
                placeholder="Amount e.g. 0.02 ETH"
                required
                value={charity.amount}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-between items-center flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
                <input
                  className="block w-full text-sm text-slate-500 bg-transparent
                  border-0 focus:outline-none focus:ring-0"
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  pattern="https?://.+(\.(jpg|png|gif))?$"
                  title="Please enter a valid image URL (http(s)://...(.png|.jpg|.jpeg|.gif))"
                  required
                  value={charity.image}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
                <input
                  className="block w-full text-sm text-slate-500 bg-transparent
                  border-0 focus:outline-none focus:ring-0"
                  type="text"
                  name="profile"
                  placeholder="Your LinkedIn Profile"
                  required
                  value={charity.profile}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
              <textarea
                className="block w-full text-sm text-slate-500 bg-transparent
                border-0 focus:outline-none focus:ring-0"
                placeholder="Description"
                name="description"
                required
                value={charity.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="">
              <button
                className="text-white text-md bg-green-600 py-3 px-8 rounded-full
                drop-shadow-xl border border-transparent hover:bg-transparent hover:border-green-600
                hover:text-green-600 focus:outline-none mt-5"
              >
                Update Data
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>

      <NavBtn />
    </div>
  )
}

export default Page

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query

  const charityData: CharityStruct = await getCharity(Number(id))
  return {
    props: {
      charityData: JSON.parse(JSON.stringify(charityData)),
    },
  }
}
