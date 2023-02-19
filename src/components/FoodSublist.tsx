import React, { Fragment } from 'react'
import { type Entries } from '../types/Entry'

import FoodItem from './FoodItem'

interface FoodSublistProps {
  location: string
  entries: Entries
  index: number
  setEntries: (entries: any) => void
  searchTerm: string
};

const FoodSublist = ({ location, entries, searchTerm, setEntries }: FoodSublistProps) => {
  return (
      <div className='border-2 border-gray-100 bg-white'>
        <h3 className="underline decoration-gray-400 inline font-bold">
          {location}
        </h3>
        <div className="grid grid-cols-5">
          <div className='col-span-1 font-semibold mx-auto'> Item </div>
          <div className='col-span-1 font-semibold mx-auto'> Expiration </div>
          <div className='col-span-1 font-semibold mx-auto'> Status </div>
          <div className='col-span-2 font-semibold mx-auto'> Action </div>
          {entries.filter(entry => entry.location === location && entry.foodName.includes(searchTerm))
            .map((food, index) =>
              <Fragment key={index}>
                <FoodItem
                food={food}
                entries={entries}
                setEntries={setEntries}
                />
              </Fragment>
            )}
        </div>
    </div>
  )
}
export default FoodSublist
