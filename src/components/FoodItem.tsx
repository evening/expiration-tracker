import React, { useEffect } from 'react'
import { type Entry } from '../types/Entry'
import dayjs from 'dayjs'

interface FoodItemProps {
  food: Entry
}

const FoodItem = ({ food }: FoodItemProps) => {
  const [isNearExpiration, setIsNearExpiration] = React.useState<boolean>(false)
  const [isExpired, setIsExpired] = React.useState<boolean>(false)
  const [warning, setWarning] = React.useState<string>('')

  const today = dayjs().startOf('day')
  const DaysToWarning = 3

  useEffect(() => {
      setIsNearExpiration(false)
      setIsExpired(true)
    if (food.expiration !== null && dayjs(today).isAfter(dayjs(food.expiration), 'days')) {
      setWarning(' | Expired')
      setIsNearExpiration(true)
      setIsExpired(false)
    } else if (food.expiration !== null && dayjs(today).isAfter(dayjs(food.expiration).subtract(DaysToWarning, 'days'), 'days')) {
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
    </p >
        {food.foodName} | {(food.expiration != null) ? dayjs(food?.expiration).format('ddd, DD MMM YYYY ') : ''} {warning}
  )
}

export default FoodItem
