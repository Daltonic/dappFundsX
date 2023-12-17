import React from 'react'
import { TfiClose } from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux'
import { CharityStruct, RootState } from '@/utils/type.dt'
import { globalActions } from '@/store/globalSlices'
import { FaBan } from 'react-icons/fa'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { banCharity } from '@/services/blockchain'

const Ban: React.FC<{ charity: CharityStruct }> = ({ charity }) => {
  const { address } = useAccount()
  const { banModal } = useSelector((states: RootState) => states.globalStates)
  const dispatch = useDispatch()
  const { setBanModal } = globalActions

  const handleBannig = async () => {
    if (!address) return toast.warning('Connect wallet first!')

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        banCharity(charity.id)
          .then((tx) => {
            console.log(tx)
            dispatch(setBanModal('scale-0'))
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Approve transaction...',
        success: 'Charity banned successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-[3000] transition-transform duration-300 ${banModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-1/5 h-7/12 p-6">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row justify-between items-center">
            <p className="font-medium text-2xl">Ban Campaign</p>
            <button
              onClick={() => dispatch(setBanModal('scale-0'))}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <TfiClose className="text-black" />
            </button>
          </div>

          <div className="flex flex-col justify-center items-center rounded-xl mb-5">
            <FaBan size={30} className="text-red-700 " />
            <p className="text-center p-2">
              Are you sure you want to ban <br />
              <span className="italic font-semibold">{charity.name}</span>
            </p>
          </div>

          <div className="mx-auto">
            <button
              onClick={handleBannig}
              className="bg-gray-100 text-red-600 px-4 space-x-1
              flex justify-center items-center rounded-full text-center py-3
              transition-all duration-300 ease-in-out
              hover:bg-red-600 hover:text-white font-medium"
            >
              {charity.banned ? 'Unban & List' : 'Ban & Unlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ban
