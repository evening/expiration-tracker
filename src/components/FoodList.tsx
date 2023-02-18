import React from 'react'
import { type Entries } from '../types/Entry'
import FoodSublist from './FoodSublist'

// Components
import { FoodLocation } from '../constants/FoodLocation'

interface FoodListProps {
  entries: Entries
  setEntries: (entries: any) => void
  searchTerm: string
  setSearchTerm: (entries: any) => void
};

const FoodList = ({ entries, setEntries, searchTerm }: FoodListProps) => {
  return (
<div>
      <h2 className="underline decoration-gray-500 font-bold">
        Food List
      </h2>
      <div className='grid grid-rows-3 lg:grid-cols-3 gap-4'>
        {Object.values(FoodLocation).map((location) => (
          <FoodSublist
            key={location}
            location={location as FoodLocation}
            entries={entries}
            searchTerm={searchTerm}
            setEntries={setEntries}
          />
        ))}
      </div>
    </div>
  )
}
export default FoodList
