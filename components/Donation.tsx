import { BiDonateHeart } from 'react-icons/bi'
import { BsDot } from 'react-icons/bs'

const Donation: React.FC<{ comment: boolean }> = ({ comment }) => {
  return (
    <div className="flex justify-start items-start space-x-4">
      <div className="bg-gray-200 rounded-full p-2">
        <BiDonateHeart size={23} />
      </div>

      <div className="flex flex-col">
        <p className="font-semibold">Richard Diedo</p>

        <div className="flex justify-start items-center">
          <span>$10</span>
          <BsDot size={30} className="text-gray-300" />
          <span className="text-gray-500">25 d</span>
        </div>

        {comment && (
          <p>
            Jack, like you I lost my Dad when I was 2 years old, killed by the actions of another.
            Like you, my Dad worked selflessly to save the lives of others, in his case as a fire
            fighter. Like you, my Dad will forever be my hero. I truly believe that...{' '}
            <a href="#" className="underline">
              Read more
            </a>
          </p>
        )}
      </div>
    </div>
  )
}

export default Donation
