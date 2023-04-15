import React, { Fragment, useEffect } from 'react'
import { type Locations, type Entry } from '../types/types'
import { FoodStatus } from '../enums/FoodStatuses'
import EditFoodButton from './EditFoodButton'
import DeleteFoodButton from './DeleteFoodButton'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { clsx } from 'clsx'

dayjs.extend(relativeTime)

interface FoodItemProps {
  food: Entry
  locations: Locations
  setLocations: (locations: Locations) => void
}

const FoodItem = ({ food, locations, setLocations }: FoodItemProps) => {
  const [status, setStatus] = React.useState<string>(FoodStatus.good)
  const [warning, setWarning] = React.useState<string>('')

  const today = dayjs().startOf('day')
  // TODO: move this to a config file or make it a user setting
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
    <Fragment>
      <span className='col-span-1 my-auto'> {food.name} </span>
      <span className='col-span-1 my-auto'> {(food.expiration != null) ? new Date(food?.expiration).toLocaleDateString() : ''} </span>
      <span className={warningStyle}> {warning} </span>
      <EditFoodButton
        entry={food}
        locations={locations}
        setLocations={setLocations}
      />
      <DeleteFoodButton
        entry={food}
        locations={locations}
        setLocations={setLocations}
      />
    </Fragment>
  )
}

export default FoodItem
