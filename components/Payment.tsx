import React from 'react'
import Donation from './Donation'
import { FaEthereum } from 'react-icons/fa'
import { CharityStruct } from '@/utils/type.dt'

const Payment: React.FC<{ charity: CharityStruct }> = ({ charity }) => {
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

        <div className="h-1 bg-green-600 rounded-full mb-2" />

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
        <button
          className="bg-amber-500 py-3 px-20 rounded-xl
          transition-all duration-300 ease-in-out
          hover:bg-amber-400"
        >
          Donate now
        </button>
      </div>

      <div className="flex flex-col space-y-10">
        {Array(4)
          .fill()
          .map((item: any, i: number) => (
            <Donation key={i} />
          ))}
      </div>

      <div className="flex justify-start items-center space-x-4">
        <button className="border border-gray-300 py-2 px-4 rounded-lg font-medium">See all</button>
        <button className="border border-gray-300 py-2 px-4 rounded-lg font-medium">
          See top donations
        </button>
      </div>
    </div>
  )
}

export default Payment
