import React, { useEffect } from 'react'
import type { Entry, Entries } from '../types/types'
import { type DraggableProvided } from 'react-beautiful-dnd'

import { FoodStatus } from '../enums/FoodStatuses'

import EditFoodButton from './EditFoodButton'
import DeleteFoodButton from './DeleteFoodButton'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { clsx } from 'clsx'

dayjs.extend(relativeTime)

interface FoodItemProps {
  entry: Entry
  entries: Entries
  isDragging?: boolean
  provided?: DraggableProvided
  setEntries: (entries: any) => void
  index: number
}

const FoodItem = ({ entry, entries, isDragging, provided, setEntries, index }: FoodItemProps) => {
  const [status, setStatus] = React.useState<string>(FoodStatus.good)
  const [warning, setWarning] = React.useState<string>('')

  const today = dayjs().startOf('day')
  const DaysToWarning = 3

  useEffect(() => {
    if (entry.expiration !== null && dayjs(today).isAfter(dayjs(entry.expiration), 'days')) {
      setStatus(FoodStatus.expired)
      setWarning('Expired')
    } else if (entry.expiration !== null && dayjs(today).isSame(dayjs(entry.expiration), 'days')) {
      setStatus(FoodStatus.expired)
      setWarning('Expires today!')
    } else if (entry.expiration !== null && dayjs(today).isAfter(dayjs(entry.expiration).subtract(DaysToWarning, 'days'), 'days')) {
      setStatus(FoodStatus.nearExpiration)
      setWarning(`Expires ${dayjs(entry.expiration).from(today)}`)
    } else {
      setStatus(FoodStatus.good)
      setWarning('Good')
    }
  }, [entry.expiration])

  const warningStyle = clsx(
    (status === FoodStatus.expired) && 'text-red-500 font-semibold',
    (status === FoodStatus.nearExpiration) && 'text-yellow-500 semibold',
    (status === FoodStatus.good) && 'text-green-700 font-semibold',
    true && 'col-span-1 my-auto'
  )

  const containerStyle = clsx(
    true && 'focus:outline-none focus:border-blue-600 focus:box-shadow-none  hover: text-amber-900 rounded-md border-2 border-transparent flex',
    (isDragging === true) ? 'border-lime-600 shadow-md shadow-emerald-500' : 'border-transparent shadow-none'
  )

  const contentStyle = clsx(
    true && 'flex grow-0 flex-col basis-11/12',
    (isDragging === true) ? 'bg-lime-100' : 'bg-white'
  )

  return (
    <div className={containerStyle}
    ref={provided?.innerRef} {...provided?.draggableProps} {...provided?.dragHandleProps}
    data-is-dragging={isDragging}
    data-testid={entry.id}
    data-index={index}
    aria-label={entry.foodName}
    >
      <div className={contentStyle}>
        <span className='col-span-1 my-auto'> {entry.foodName} </span>
        <span className='col-span-1 my-auto'> {(entry.expiration != null) ? new Date(entry?.expiration).toLocaleDateString() : ''} </span>
        <span className={warningStyle}> {warning} </span>
        <EditFoodButton
          entry={entry}
          index={index}
          entries={entries}
          setEntries={setEntries}
          />
          <DeleteFoodButton
          entry={entry}
          entries={entries}
          setEntries={setEntries}
          />
        </div>
    </div>
  )
}

export default React.memo<FoodItemProps>(FoodItem)
