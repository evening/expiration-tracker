import React, { useEffect } from 'react'
import { type Entry } from '../types/Entry'
import { FoodStatus } from '../constants/FoodStatus'

import dayjs from 'dayjs'

interface FoodItemProps {
  food: Entry
}

const FoodItem = ({ food }: FoodItemProps) => {
  const [status, setStatus] = React.useState<string>(FoodStatus.good)
  const [warning, setWarning] = React.useState<string>('')

  const today = dayjs().startOf('day')
  const DaysToWarning = 3

  useEffect(() => {
    if (food.expiration !== null && dayjs(today).isAfter(dayjs(food.expiration), 'days')) {
      setStatus(FoodStatus.expired)
      setWarning(' | Expired')
    } else if (food.expiration !== null && dayjs(today).isAfter(dayjs(food.expiration).subtract(DaysToWarning, 'days'), 'days')) {
      setStatus(FoodStatus.nearExpiration)
      setWarning(`| Expires in less than ${DaysToWarning} day[s]!`)
    } else {
      setStatus(FoodStatus.good)
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
