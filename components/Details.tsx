import React from 'react'
import { MdCheckCircle } from 'react-icons/md'
import Donation from './Donation'

const IMAGE_URL =
  'https://ksr-ugc.imgix.net/assets/043/090/347/1cce47acb0d545ca3e3246315d402fdd_original.jpg?ixlib=rb-4.1.0&crop=faces&w=1024&h=576&fit=crop&v=1700169309&auto=format&frame=1&q=92&s=abffe35ae96a32ba820dcf77b1a72589'
const Details: React.FC = () => {
  return (
    <div className="flex flex-col w-full md:w-2/3 space-y-6">
      <h4 className="text-4xl font-semibold">Help PoB's Jack keep raising money for other kids</h4>
      <img src={IMAGE_URL} alt="donation" className="rounded-xl" />

      <p className="sm:flex justify-start items-center sm:space-x-1">
        <span>
          Xheng ipasum dolor sit amet consectetur adipisicing elit. Corrupti expedita tempore
          consequatur natus quasi velit.
        </span>
        <span className="flex">
          <MdCheckCircle size={25} className="text-green-600" />
          <a href="#" className="underline">
            Learn more
          </a>
        </span>
      </p>

      <hr className="border-t border-gray-300" />

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aliquid harum ratione
        veritatis atque accusamus qui voluptatem doloremque dolor nesciunt accusantium id tenetur,
        exercitationem, sequi consectetur quia distinctio quod! Quia.
      </p>
      <div className="flex justify-start items-center space-x-4">
        <button className="border border-gray-300 py-3 px-20 rounded-lg">Donate</button>
        <button className="border border-gray-300 py-3 px-20 rounded-lg">Share</button>
      </div>

      <hr className="border-t border-gray-300" />

      <div>
        <h4 className="font-semibold text-lg mb-1">Words of support (43)</h4>
        <p className="mb-4 text-gray-600">Please donate to share words of support.</p>

        <div className="flex flex-col space-y-10">
          {Array(5)
            .fill()
            .map((item: any, i: number) => (
              <Donation comment={true} key={i} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Details
