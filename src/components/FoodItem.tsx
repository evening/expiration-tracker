import React from 'react'
import { type Entry } from '../types/Entry'

interface FoodItemProps {
  food: Entry
}

const FoodItem = ({ food }: FoodItemProps) => {
  return (
    <>
      <span className='col-span-1 my-auto'> {food.foodName} </span>
      <span className='col-span-1 my-auto'> {(food.expiration != null) ? new Date(food?.expiration).toLocaleDateString() : ''} </span>
    </>
  )
}

export default FoodItem
