import React, { useEffect } from 'react'
import { type Entry } from '../types/Entry'
import { FoodStatus } from '../constants/FoodStatus'
import EditFoodButton from './EditFoodButton'
import DeleteFoodButton from './DeleteFoodButton'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { clsx } from 'clsx'

dayjs.extend(relativeTime)

interface FoodItemProps {
  food: Entry
  index: number
  entries: Entry[]
  setEntries: (entries: any) => void
}

const FoodItem = ({ food, index, entries, setEntries }: FoodItemProps) => {
  const [status, setStatus] = React.useState<string>(FoodStatus.good)
  const [warning, setWarning] = React.useState<string>('')

  const today = dayjs().startOf('day')
  const DaysToWarning = 3

  useEffect(() => {
    if (food.expiration !== null && dayjs(today).isAfter(dayjs(food.expiration), 'days')) {
      setStatus(FoodStatus.expired)
      setWarning('Expired')
    } else if (food.expiration !== null && dayjs(today).isSame(dayjs(food.expiration), 'days')) {
      setStatus(FoodStatus.expired)
      setWarning('Expires today!')
    } else if (food.expiration !== null && dayjs(today).isAfter(dayjs(food.expiration).subtract(DaysToWarning, 'days'), 'days')) {
      setStatus(FoodStatus.nearExpiration)
      setWarning(`Expires ${dayjs(food.expiration).from(today)}`)
    } else {
      setStatus(FoodStatus.good)
      setWarning('Good')
    }
  }, [food.expiration])

  const warningStyle = clsx(
    (status === FoodStatus.expired) && 'text-red-500 font-semibold',
    (status === FoodStatus.nearExpiration) && 'text-yellow-500 semibold',
    (status === FoodStatus.good) && 'text-green-700 font-semibold',
    true && 'col-span-1 my-auto'
  )

  return (
    <>
      <span className='col-span-1 my-auto'> {food.foodName} </span>
      <span className='col-span-1 my-auto'> {(food.expiration != null) ? new Date(food?.expiration).toLocaleDateString() : ''} </span>
      <span className={warningStyle}> {warning} </span>
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
  )
}

export default FoodItem
