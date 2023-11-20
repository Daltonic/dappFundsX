import Link from 'next/link'
import React from 'react'
import { MdSunnySnowing } from 'react-icons/md'

const Footer: React.FC = () => {
  return (
    <>
      <div className="border-t border-gray-300 py-5 my-10">
        <div className="lg:w-2/3 w-full mx-auto px-5">
          <div
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4
        justify-items-start items-start"
          >
            <Link
              className="text-sm font-semibold leading-relaxed text-green-600
            flex justify-start items-center py-2 whitespace-no-wrap uppercase"
              href="/"
            >
              <MdSunnySnowing size={25} />
              <span>Dapp Funds</span>
            </Link>

            <div className="space-y-2">
              <h4 className="font-semibold">Fundraise for</h4>
              <ul className="space-y-2">
                <li>Medical</li>
                <li>Emergency</li>
                <li>Memorial</li>
                <li>Education</li>
                <li>Charity</li>
                <li>Coronavirus fundraising</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Learn more</h4>
              <ul className="space-y-2">
                <li>How GoFundMe Works</li>
                <li>Common questions</li>
                <li>Success stories</li>
                <li>Supported countries</li>
                <li>Charity fundraising</li>
                <li>Corporate fundraising</li>
                <li>Event fundraising</li>
                <li>Pricing</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Resources</h4>
              <ul className="space-y-2">
                <li>Help centre</li>
                <li>Blog</li>
                <li>Press centre</li>
                <li>Careers</li>
                <li>About</li>
                <li>More resources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 py-5 my-10">
        <div className="lg:w-2/3 w-full mx-auto px-5">
          <div
            className="flex flex-col sm:flex-row
            justify-center sm:justify-between"
          >
            <p className="flex space-x-4 items-center text-gray-600">
              With ♥️ DappFunds &copy;{new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
