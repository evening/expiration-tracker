import React, { Fragment } from 'react'
import { type Entries } from '../types/Entry'

import DeleteFoodButton from './DeleteFoodButton'
import EditFoodButton from './EditFoodButton'
import FoodItem from './FoodItem'

interface FoodSublistProps {
  location: string
  entries: Entries
  setEntries: (entries: any) => void
  searchTerm: string
};

const FoodSublist = ({ location, entries, searchTerm, setEntries }: FoodSublistProps) => {
  return (
      <div>
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
                <FoodItem food={food} />
                <div className='col-span-2'>
                  <EditFoodButton
                    food={food}
                    index={index}
                    entries={entries}
                    setEntries={setEntries}
                  />
                  <DeleteFoodButton
                    food={food}
                    entries={entries}
                    setEntries={setEntries}
                  />
                </div>
              </Fragment>
            )}
        </div>
    </div>
  )
}
export default FoodSublist
