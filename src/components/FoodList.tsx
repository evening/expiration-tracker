import React, { Fragment } from 'react'
import { type Entries } from '../types/Entry'

import FoodItem from './FoodItem'

interface FoodListProps {
  location: string
  entries: Entries
  index: number
  setEntries: (entries: any) => void
  searchTerm: string
};

const FoodList = ({ entries, setEntries, searchTerm }: FoodListProps) => {
  const [colOrder, setColOrder] = useState<FoodLocations[]>(Object.values(FoodLocations))

  const onDragEnd = (result: any) => {
    if (result.destination === null) return
    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index
    setColOrder((locations) => {
      const newOrder = Array.from(locations)
      newOrder.splice(sourceIndex, 1)
      newOrder.splice(destinationIndex, 0, locations[sourceIndex])
      return newOrder
    })
  }

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
                index = {index}
                entries={entries}
                setEntries={setEntries}
                />
              </Fragment>
            )}
        </div>
    </div>
  )
}
export default FoodList
