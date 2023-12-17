import { CharityStruct } from '@/utils/type.dt'
import Link from 'next/link'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { MdChevronRight } from 'react-icons/md'

const Cards: React.FC<{ charities: CharityStruct[] }> = ({ charities }) => {
  return (
    <div className="my-10 lg:w-2/3 w-full mx-auto">
      <p className="text-center">Where you can help</p>
      <h4 className="text-2xl font-medium mb-6 mt-2 text-center">
        {charities.length > 0 ? 'Featured Topics' : 'No Charities Yet'}
      </h4>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {charities.map((charity: CharityStruct, i: number) => (
          <Card key={i} charity={charity} />
        ))}
      </div>
    </div>
  )
}

const Card: React.FC<{ charity: CharityStruct }> = ({ charity }) => {
  return (
    <div className="shadow flex flex-col w-80 bg-gray-50 rounded-lg overflow-hidden">
      <img src={charity.image} alt={charity.name} />
      <div className="p-5 space-y-8">
        <div>
          <h4 className="text-xl font-medium capitalize mb-1">{charity.name}</h4>
          <div className="flex justify-start items-center">
            <span>{charity.amount.toFixed(2)} ETH</span>
            <BsDot size={30} className="text-gray-300" />
            <span className="text-gray-500">
              {charity.donations == 1
                ? `${charity.donations} donation`
                : `${charity.donations} donations`}
            </span>
          </div>
        </div>
        <Link
          className="flex justify-start items-center space-x-2
          transition-all duration-300 ease-in-out hover:pl-5"
          href={'/donations/' + charity.id}
        >
          <span>Donate now</span>
          <MdChevronRight />
        </Link>
      </div>
    </div>
  )
}

export default Cards
