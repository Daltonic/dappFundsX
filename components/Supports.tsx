import React from 'react'
import { TfiClose } from 'react-icons/tfi'
import Donation from './Donation'
import { RootState, SupportStruct } from '@/utils/type.dt'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/globalSlices'

const Supports: React.FC<{ supports: SupportStruct[] }> = ({ supports }) => {
  const { supportModal } = useSelector((states: RootState) => states.globalStates)
  const dispatch = useDispatch()
  const { setSupportModal } = globalActions

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-[3000] transition-transform duration-300 ${supportModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col space-y-8">
          <div className="flex flex-row justify-between items-center">
            <p className="font-medium text-2xl">Donations ({supports.length})</p>
            <button
              onClick={() => dispatch(setSupportModal('scale-0'))}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <TfiClose className="text-black" />
            </button>
          </div>

          <div className="flex flex-col space-y-10 max-h-[30rem] overflow-scroll">
            {supports.map((support: any, i: number) => (
              <Donation support={support} key={i} />
            ))}
          </div>

          <button
            type="submit"
            className="flex flex-row justify-center items-center w-full text-black text-md
            bg-amber-600 py-3 px-20 rounded-full drop-shadow-xl border font-medium
            focus:outline-none focus:ring mt-5"
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default Supports
