import NavBtn from '@/components/NavBtn'
import Head from 'next/head'

export default function Create() {
  return (
    <div>
      <Head>
        <title>Charity Create</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>

      <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
        <div className="block justify-center items-center m-auto w-full sm:w-3/5">
          <form className="flex flex-col space-y-4">
            <div className="flex items-center justify-center mb-4">
              <h2>Create Charity</h2>
            </div>

            <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
              <input
                className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
                type="text"
                name="charity"
                placeholder="Charity Name"
                required
              />
            </div>

            <div className="flex justify-between items-center flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
                <input
                  className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  required
                />
              </div>

              <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
                <input
                  className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
                  type="text"
                  name="profile"
                  placeholder="Your LinkedIn Profile"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
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

            <div className="flex justify-between items-center rounded-xl p-2 w-full border border-gray-300">
              <textarea
                className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
                placeholder="Description"
                name="description"
                required
              ></textarea>
            </div>

            <div className="">
              <button
                className="text-white text-md bg-green-600 py-3 px-8 rounded-full
                drop-shadow-xl border border-transparent hover:bg-transparent hover:border-green-600
                hover:text-green-600 focus:outline-none mt-5"
              >
                Create & List
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>

      <NavBtn />
    </div>
  )
}
