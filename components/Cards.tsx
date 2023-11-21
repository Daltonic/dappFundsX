import React from 'react'
import { MdChevronRight } from 'react-icons/md'

const IMAGE_URL =
  'https://ksr-ugc.imgix.net/assets/043/090/347/1cce47acb0d545ca3e3246315d402fdd_original.jpg?ixlib=rb-4.1.0&crop=faces&w=1024&h=576&fit=crop&v=1700169309&auto=format&frame=1&q=92&s=abffe35ae96a32ba820dcf77b1a72589'
const Cards = () => {
  return (
    <div className="my-10 lg:w-2/3 w-full mx-auto">
      <p className="text-center">Where you can help</p>
      <h4 className="text-2xl font-medium mb-6 mt-2 text-center">Featured Topics</h4>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {Array(5)
          .fill()
          .map((item: any, i: number) => (
            <Card key={i} />
          ))}
      </div>
    </div>
  )
}

const Card = () => {
  return (
    <div className="shadow flex flex-col w-96 bg-gray-50 rounded-lg overflow-hidden">
      <img src={IMAGE_URL} alt="hello" />
      <div className="p-5 space-y-8">
        <h4 className="text-xl font-medium">Help after UK storms</h4>
        <button
          className="flex justify-start items-center space-x-2
        transition-all duration-300 ease-in-out hover:pl-5"
        >
          <span>Donate now</span>
          <MdChevronRight />
        </button>
      </div>
    </div>
  )
}

export default Cards
