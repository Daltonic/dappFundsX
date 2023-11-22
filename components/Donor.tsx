import React from 'react'
import { TfiClose } from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux'
import { CharityStruct, RootState } from '@/utils/type.dt'
import { globalActions } from '@/store/globalSlices'

const Donor: React.FC<{ charity: CharityStruct }> = ({ charity }) => {
  const { donorsModal } = useSelector((states: RootState) => states.globalStates)
  const dispatch = useDispatch()
  const { setDonorModal } = globalActions

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-[3000] transition-transform duration-300 ${donorsModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-1/5 h-7/12 p-6">
        <form className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between items-center">
            <p className="font-medium text-2xl">Support Us</p>
            <button
              onClick={() => dispatch(setDonorModal('scale-0'))}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <TfiClose className="text-black" />
            </button>
          </div>

          <div
            className="flex justify-between items-center rounded-xl p-2 w-full
          border border-gray-300 mt-5"
          >
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="name"
              placeholder="Your Name (Optional)"
              required
            />
          </div>

          <div
            className="flex justify-between items-center rounded-xl p-2 w-full
          border border-gray-300 mt-5"
          >
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="comment"
              placeholder="Words of support (Optional)"
              required
            />
          </div>

          <div
            className="flex justify-between items-center rounded-xl p-2 w-full
          border border-gray-300 mt-5"
          >
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="target"
              placeholder="Amount e.g. 0.02 ETH"
              required
            />
          </div>

          <div className="mx-auto">
            <button
              type="submit"
              className="flex flex-row justify-center items-center w-full text-black text-md
            bg-amber-600 py-3 px-20 rounded-full drop-shadow-xl border font-medium
            focus:outline-none focus:ring transition-all duration-300 ease-in-out
            hover:bg-amber-500"
            >
              Donate Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Donor
