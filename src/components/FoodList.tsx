import React from 'react'
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
      <ul>
        {entries.filter(entry => { if (searchTerm != null) { return entry.foodName.includes(searchTerm) } return entry })
          .map((food, index) =>
            <li key={index}>
              <>
                <FoodItem
                  food={food}
                />
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
              </>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default FoodList
