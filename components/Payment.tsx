import React from 'react'
import { BiDonateHeart } from 'react-icons/bi'
import { BsDot } from 'react-icons/bs'

const Payment: React.FC = () => {
  return (
    <div
      className="w-full md:w-1/3 shadow-lg shadow-gray-300 p-6
    rounded-xl space-y-4 max-h-[46rem] overflow-hidden"
    >
      <div className="font-light">
        <div className="flex items-end space-x-2 mb-4">
          <h4 className="text-4xl">$59,235</h4>
          <span className="text-gray-600">raised of $100,000 target</span>
        </div>

        <div className="h-1 bg-green-600 rounded-full mb-2" />

        <span className="text-gray-600">1.1k donations</span>
      </div>

      <div className="flex flex-col space-y-2 font-semibold">
        <button className="bg-amber-400 py-3 px-20 rounded-xl">Share</button>
        <button className="bg-amber-500 py-3 px-20 rounded-xl">Donate now</button>
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
        <button className="border border-gray-300 py-2 px-4 rounded-lg font-medium">See top donations</button>
      </div>
    </div>
  )
}

const Donation: React.FC = () => {
  return (
    <div className="flex justify-start items-start space-x-4">
      <div className="bg-gray-200 rounded-full p-2">
        <BiDonateHeart size={23} />
      </div>

      <div className="flex flex-col">
        <p className="font-semibold">Richard Diedo</p>

        <div className="flex justify-start items-center">
          <span>$10</span>
          <BsDot size={30} className="text-gray-300" />
          <span className="text-gray-500">25 d</span>
        </div>
      </div>
    </div>
  )
}

export default Payment
