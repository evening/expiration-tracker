import React, { useEffect } from 'react'
import { type Locations, type Entry } from '../types/types'
import { FoodStatus } from '../enums/FoodStatuses'

import FoodInfoButton from './FoodInfoButton'
import EditFoodButton from './EditFoodButton'
import CopyFoodButton from './CopyFoodButton'
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

  const today = dayjs().startOf('day')
  // TODO: move this to a config file or make it a user setting
  const DaysToWarning = 3

  useEffect(() => {
    switch (true) {
      case (food.expiration !== null && dayjs(today).isAfter(dayjs(food.expiration), 'days')):
      case (food.expiration !== null && dayjs(today).isSame(dayjs(food.expiration), 'days')):
        setStatus(FoodStatus.expired)
        break
      case (food.expiration !== null && dayjs(today).isAfter(dayjs(food.expiration).subtract(DaysToWarning, 'days'), 'days')):
        setStatus(FoodStatus.nearExpiration)
        break
      default:
        setStatus(FoodStatus.good)
        break
    }
  }, [food.expiration])

  const warningBasedStyle = clsx(
    (status === FoodStatus.expired) && 'text-danger-300 font-semibold',
    (status === FoodStatus.nearExpiration) && 'text-warning-300',
    (status === FoodStatus.good) && 'text-primary-300',
    true && 'col-span-1 my-auto truncate'
  )

  return (
    <div className="grid grid-cols-3 mx-auto">
      <span className={`${warningBasedStyle}`}>
        <FoodInfoButton entry={food} />
        {food.name}
      </span>
      <span className={`${warningBasedStyle}`}> {(food.expiration != null) ? new Date(food?.expiration).toLocaleDateString() : ''} </span>
      <div className='col-span-1'>
      <EditFoodButton
        entry={food}
        locations={locations}
        setLocations={setLocations}
      />
      <CopyFoodButton
        entry={food}
        locations={locations}
        setLocations={setLocations}
      />
      <DeleteFoodButton
        entry={food}
        locations={locations}
        setLocations={setLocations}
      />
      </div>
    </div>
  )
}

export default FoodItem
