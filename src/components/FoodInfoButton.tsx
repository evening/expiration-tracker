import React, { Fragment } from 'react'

import InfoIcon from '@mui/icons-material/Info'
import CancelIcon from '@mui/icons-material/Cancel'

import { type Entry } from '../types/types'

interface FoodInfoButtonProps {
  entry: Entry
}

const FoodInfoButton = ({ entry }: FoodInfoButtonProps) => {
  const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false)

  return (
    <Fragment>
      <InfoIcon
        className="text-secondary-300 active:ring-warning-300 text-sm px-1 py-1 rounded cursor-pointer  hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        onClick={() => { setShowInfoModal(!showInfoModal) }}
      />
      {showInfoModal
        ? (
          <Fragment>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none focus:outline-none min-w-[300px]">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-2 border-secondary-300 rounded-lg shadow-lg relative px-4 pt-4 pb-2 flex flex-col w-full bg-white outline-primary-300 focus:outline-primary-300">
                    <div className='p-2 border-secondary-300'>
                      <span className="pb-2 underline underline-offset-2 decoration-secondary-300 text-lg text-secondary-300 text-center">
                        Item Details
                      </span>
                      <button className="p-1 bg-transparent text-primary-300 float-right leading-none outline-none focus:ring-secondary-300 focus:outline-none"
                          onClick={() => { setShowInfoModal(false) }}
                        >
                          <CancelIcon />
                      </button>
                    </div>
                  <div className='flex flex-col px-4 pb-4'>
                      <span className='text-sm text-secondary-200 my-auto text-left'> Name: </span>
                      <span className='pl-2 text-left'> {entry.name} </span>
                      <span className='text-sm text-secondary-200 my-auto text-left'> Location: </span>
                      <span className='pl-2 text-left'> {entry.locationName} </span>
                      <span className='text-sm text-secondary-200 my-auto text-left'> Expires: </span>
                      <span className='pl-2 text-left'> {entry.expiration?.toString().substring(0, 10)} </span>
                  </div>
                </div>
              </div>
            </div>
            </Fragment>
          )
        : null}
    </Fragment>
  )
}

export default FoodInfoButton
