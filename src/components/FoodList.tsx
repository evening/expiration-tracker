import React, { Fragment } from 'react'
import { type Entries } from '../types/Entry'

// Components
import EditFoodButton from './EditFoodButton'
import DeleteFoodButton from './DeleteFoodButton'
import FoodItem from './FoodItem'

interface FoodListProps {
  entries: Entries
  setEntries: (entries: any) => void
  searchTerm: string
  setSearchTerm: (entries: any) => void
};

const FoodList = ({ entries, setEntries, searchTerm }: FoodListProps) => {
  return (
    <div>
      <h2 className="underline decoration-gray-500 font-extrabold">
        Food List
      </h2>
      <div className='grid grid-cols-3 gap-4'>
        <div>
        <h3 className="underline decoration-gray-400 inline font-bold">
          Fridge
        </h3>
        <div className="grid grid-cols-4">
        <div className='col-span-1 font-semibold mx-auto'> Item </div>
        <div className='col-span-1 font-semibold mx-auto'> Expiration </div>
        <div className='col-span-2 font-semibold mx-auto'> Action </div>
        {entries.filter(entry => { if (searchTerm != null) { return entry.foodName.includes(searchTerm) } return entry })
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
        <div>
        <h3 className="underline decoration-gray-400 inline font-bold">
          Freezer
        </h3>
        </div>
        <div>
        <h3 className="underline decoration-gray-400 inline font-bold">
          Pantry
        </h3>
        </div>
      </div>
    </div>
  )
}
export default FoodList
