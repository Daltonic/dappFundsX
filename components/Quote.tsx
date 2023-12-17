import React from 'react'
import { MdChevronRight } from 'react-icons/md'
import { LuBadgeCheck } from 'react-icons/lu'
import Link from 'next/link'

const Quote = () => {
  return (
    <div className="bg-green-600 text-white py-10 my-10">
      <div className="text-white lg:w-2/3 w-full mx-auto space-y-4 mt-2 px-8 lg:px-0">
        <h4 className="font-semibold flex justify-start items-center space-x-1">
          <LuBadgeCheck />
          <span>Trust & Safty</span>
        </h4>
        <h1 className="font-semibold text-5xl">We've got you covered.</h1>
        <p className="w-full lg:w-2/4">
          With a global team dedicated to trust and safety, we’ve successfully managed fundraisers
          worldwide for over a decade. Don’t worry about a thing, we’ve got it covered.
        </p>

        <div className='flex'>
          <Link
            href={'/donations/create'}
            className="bg-white text-green-600 px-4 space-x-1
            flex justify-center items-center rounded-full text-center py-3
            transition duration-300 ease-in-out hover:bg-green-600 hover:text-white"
          >
            <MdChevronRight size={25} />
            <span>Start a Dapp Fund</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Quote
