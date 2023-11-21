import Link from 'next/link'
import React from 'react'
import { FiArrowRightCircle } from 'react-icons/fi'

const Start: React.FC = () => {
  return (
    <div className="lg:w-2/3 w-full mx-auto my-10">
      <div className="flex flex-col lg:flex-row justify-start items-center space-x-0 lg:space-x-4">
        <div
          className="w-full lg:w-80 flex flex-col border-2 border-transparent
          justify-center items-center space-y-2 sm:items-start"
        >
          <h4 className="font-medium text-gray-800">Make a difference</h4>
          <h1 className="text-4xl font-medium">
            Fundraise <br /> for...
          </h1>
        </div>
        <Link
          href={'/'}
          className="w-full lg:w-80 flex flex-col border-2 border-transparent
          justify-center items-center space-y-4 rounded-lg hover:border-green-600
          transition-all duration-300 ease-in-out cursor-pointer mt-4 lg:mt-0"
        >
          <img src="https://d25oniaj7o2jcw.cloudfront.net/start-yourself.png" alt="yourself" />
          <h4 className="text-xl font-medium">Yourself</h4>
          <FiArrowRightCircle size={35} />
          <div className=" h-6"></div>
        </Link>
        <Link
          href={'/'}
          className="w-full lg:w-80 flex flex-col border-2 border-transparent
          justify-center items-center space-y-4 rounded-lg hover:border-green-600
          transition-all duration-300 ease-in-out cursor-pointer mt-4 lg:mt-0"
        >
          <img src="https://d25oniaj7o2jcw.cloudfront.net/start-friends-family.png" alt="f&f" />
          <h4 className="text-xl font-medium">Friends & Family</h4>
          <FiArrowRightCircle size={35} />
          <div className=" h-6"></div>
        </Link>
        <Link
          href={'/'}
          className="w-full lg:w-80 flex flex-col border-2 border-transparent
          justify-center items-center space-y-4 rounded-lg hover:border-green-600
          transition-all duration-300 ease-in-out cursor-pointer mt-4 lg:mt-0"
        >
          <img src="https://d25oniaj7o2jcw.cloudfront.net/start-charity.png" alt="charity" />
          <h4 className="text-xl font-medium">Charity</h4>
          <FiArrowRightCircle size={35} />
          <div className=" h-6"></div>
        </Link>
      </div>
    </div>
  )
}

export default Start
