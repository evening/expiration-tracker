import React, { useEffect } from 'react'
import { type Entry } from '../types/Entry'
import { FoodStatus } from '../constants/FoodStatus'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { clsx } from 'clsx'

dayjs.extend(relativeTime)

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
    } else if (food.expiration !== null && dayjs(today).isSame(dayjs(food.expiration), 'days')) {
      setStatus(FoodStatus.expired)
      setWarning('| Expires today!')
    } else if (food.expiration !== null && dayjs(today).isAfter(dayjs(food.expiration).subtract(DaysToWarning, 'days'), 'days')) {
      setStatus(FoodStatus.nearExpiration)
      setWarning(`| Expires ${dayjs(food.expiration).from(today)}`)
    } else {
      setStatus(FoodStatus.good)
      setWarning('')
    }
  }, [food.expiration])

  const itemStyle = clsx(
    (status === FoodStatus.expired) && 'text-red-500 font-medium',
    status === FoodStatus.nearExpiration && 'text-yellow-500',
    status === FoodStatus.good && 'text-green-700'
  )

  return (
    <>
      <p className={itemStyle} >
        {food.foodName} | {(food.expiration != null) ? dayjs(food?.expiration).format('ddd, DD MMM YYYY ') : ''} {warning}
      </p >
    </>
  )
}

export default FoodItem
