import React from 'react'
import { type Entry } from '../types/Entry'

interface FoodItemProps {
  food: Entry
}

const FoodItem = ({ food }: FoodItemProps) => {
  return (
    <p>
      {food.foodName} | {(food.expiration != null) ? new Date(food?.expiration).toLocaleDateString() : ''}
    </p>
  )
}

export default FoodItem
