import React from 'react'
import ConnectBtn from './ConnectBtn'
import Link from 'next/link'
import { MdSunnySnowing } from 'react-icons/md'

const Header: React.FC = () => {
  return (
    <nav
      className="relative flex flex-wrap items-center justify-between
    px-2 py-3 navbar-expand-lg shadow-md text-white mb-3"
    >
      <div
        className="container px-4 mx-auto flex flex-wrap items-center
      justify-between"
      >
        <div className="w-full relative flex justify-between px-4 lg:static">
          <Link
            className="text-sm font-semibold leading-relaxed text-green-600
            flex justify-start items-center py-2 whitespace-no-wrap uppercase"
            href="/"
          >
            <MdSunnySnowing size={25} />
            <span>Dapp Funds</span>
          </Link>

          <ConnectBtn />
        </div>
      </div>
    </nav>
  )
}

export default Header
