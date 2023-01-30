import React, { useEffect } from 'react'
import { type Entry } from '../types/Entry'

interface FoodItemProps {
  food: Entry
}

const FoodItem = ({ food }: FoodItemProps) => {
  const [isNearExpiration, setIsNearExpiration] = React.useState<boolean>(false)
  const [isExpired, setIsExpired] = React.useState<boolean>(false)
  const [warning, setWarning] = React.useState<string>('')

  const today = new Date()
  const DaysToWarning = 3

  useEffect(() => {
    if (food.expiration !== null && today > food.expiration) {
      setIsNearExpiration(false)
      setIsExpired(true)
      setWarning(' | Expired')
    } else if (food.expiration !== null && today.valueOf() > (food.expiration.valueOf() - DaysToWarning * 24 * 60 * 60 * 1000)) {
      setIsNearExpiration(true)
      setIsExpired(false)
      setWarning(`| Expires in less than ${DaysToWarning} day[s]!`)
    } else {
      setIsNearExpiration(false)
      setIsExpired(false)
      setWarning('')
    }
  }, [food.expiration])

  const conditionalClass = isExpired ? 'text-red-500' : isNearExpiration ? 'text-yellow-500' : 'text-green-700'

  return (
    <p className={`${conditionalClass}`} >
      {food.foodName} | {(food.expiration != null) ? new Date(food?.expiration).toLocaleDateString() : ''} {warning}
    </p >
  )
}

export default FoodItem
