import React from 'react'
import Donation from './Donation'
import { FaBan, FaEthereum } from 'react-icons/fa'
import { CharityStruct, SupportStruct } from '@/utils/type.dt'
import { useDispatch } from 'react-redux'
import { globalActions } from '@/store/globalSlices'
import { useAccount } from 'wagmi'

interface ComponentProp {
  charity: CharityStruct
  supports: SupportStruct[]
  owner: string
}

const Payment: React.FC<ComponentProp> = ({ charity, supports, owner }) => {
  const { address } = useAccount()
  const dispatch = useDispatch()
  const { setSupportModal, setDonorModal, setBanModal } = globalActions

  return (
    <div
      className="w-full md:w-1/3 shadow-lg shadow-gray-300 p-6
    rounded-xl space-y-4 max-h-[46rem] overflow-hidden"
    >
      <div className="font-light">
        <div className="flex items-end space-x-2 mb-4">
          <h4 className="text-4xl flex justify-start items-center space-x-1">
            <FaEthereum />
            <span>{charity.raised.toFixed(2)}</span>
          </h4>
          <span className="text-gray-600">raised of {charity.amount.toFixed(2)} ETH target</span>
        </div>

        <div className="h-1 bg-gray-300 rounded-full mb-2">
          <div
            className="h-full overflow-hidden bg-green-600 rounded-full"
            style={{ width: `${(charity.raised / charity.amount) * 100}%` }}
          />
        </div>

        <span className="text-gray-600">{charity.donations} donations</span>
      </div>

      <div className="flex flex-col space-y-2 font-semibold">
        <button
          className="bg-amber-500 py-3 px-20 rounded-xl
          transition-all duration-300 ease-in-out
          hover:bg-amber-600"
        >
          Share
        </button>
        {!charity.banned ? (
          <button
            className="bg-amber-500 py-3 px-20 rounded-xl
          transition-all duration-300 ease-in-out
          hover:bg-amber-400"
            onClick={() => dispatch(setDonorModal('scale-100'))}
          >
            Donate now
          </button>
        ) : (
          <button
            className="border border-amber-500 py-3 px-20 rounded-xl
          transition-all duration-300 ease-in-out flex justify-center
          hover:border-amber-400 hover:bg-red-100 items-center space-x-2"
          >
            <span>Banned</span>
            <FaBan size={20} className="text-red-700 " />
          </button>
        )}
      </div>

      <div className="flex flex-col space-y-10">
        {supports.map((support: any, i: number) => (
          <Donation support={support} key={i} />
        ))}
      </div>

      <div className="flex justify-start items-center space-x-4">
        <button
          onClick={() => dispatch(setSupportModal('scale-100'))}
          className="border border-gray-300 py-2 px-4 rounded-lg font-medium
          transition-all duration-300 ease-in-out
         hover:bg-gray-100"
        >
          See all
        </button>
        <button
          onClick={() => dispatch(setSupportModal('scale-100'))}
          className="border border-gray-300 py-2 px-4 rounded-lg font-medium
          transition-all duration-300 ease-in-out
         hover:bg-gray-100"
        >
          See top donations
        </button>

        {owner === address && (
          <button
            onClick={() => dispatch(setBanModal('scale-100'))}
            className="border border-gray-300 py-2 px-4 rounded-lg font-medium
          transition-all duration-300 ease-in-out
         hover:bg-red-100"
          >
            {charity.banned ? 'Unban Campaign' : 'Ban Campaign'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Payment
