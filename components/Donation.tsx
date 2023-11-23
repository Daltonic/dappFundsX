import { SupportStruct } from '@/utils/type.dt'
import { BiDonateHeart } from 'react-icons/bi'
import { BsDot } from 'react-icons/bs'
import { truncate } from '@/utils/helper'
import { useState } from 'react'
import Moment from 'react-moment'

interface ComponentProp {
  comment?: boolean
  support: SupportStruct
}

const Donation: React.FC<ComponentProp> = ({ comment, support }) => {
  const [revealed, setRevealed] = useState<boolean>(false)

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault()
    setRevealed(!revealed)
  }

  return (
    <div className="flex justify-start items-start space-x-4">
      <div className="bg-gray-200 rounded-full p-2">
        <BiDonateHeart size={23} />
      </div>

      <div className="flex flex-col">
        {support?.fullname ? (
          <p className="font-semibold capitalize">{support?.fullname}</p>
        ) : (
          <p className="font-semibold capitalize">
            {truncate({
              text: support?.supporter,
              startChars: 4,
              endChars: 4,
              maxLength: 11,
            })}
          </p>
        )}

        <div className="flex justify-start items-center">
          <span>{support?.amount.toFixed(2)} ETH</span>
          <BsDot size={30} className="text-gray-300" />
          <Moment className="text-gray-500" toNow>
            {support?.timestamp}
          </Moment>
        </div>

        {comment && (
          <p>
            {!revealed ? (
              <>
                {support?.comment.length > 103 ? (
                  <span>
                    {truncate({
                      text: support?.comment,
                      startChars: 100,
                      endChars: 0,
                      maxLength: 103,
                    })}{' '}
                    <a href="#" onClick={toggle} className="underline">
                      Read more
                    </a>
                  </span>
                ) : (
                  support?.comment
                )}
              </>
            ) : (
              <span>
                {support?.comment}{' '}
                <a href="#" onClick={toggle} className="underline">
                  Read less
                </a>
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default Donation
