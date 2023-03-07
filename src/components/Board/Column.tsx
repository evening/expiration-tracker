import React from 'react'

import { Draggable } from 'react-beautiful-dnd'
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import FoodList from '../FoodList'
import type { Entries, Location } from '../../types/types'
import { getLocationDraggingBackgroundColor } from '../../utils/styles'

interface ColumnProps {
  entries: Entries
  setEntries: (entries: any) => void
  searchTerm: string
  location: Location
  index: number
  isScrollable?: boolean
  isCombineEnabled?: boolean
  useClone?: boolean
}

const Column = (props: ColumnProps) => {
  const { entries, setEntries, location, isScrollable, useClone, searchTerm, index } = props
  return (
      <Draggable draggableId={location.name} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div id='container' className={`grid grid-cols-5 border-4 border-gray-200 ${getLocationDraggingBackgroundColor(snapshot.isDragging)} `} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <span className={`border-4 border-gray-100 ${getLocationDraggingBackgroundColor(snapshot.isDragging)} transition ease-linear hover:bg-blue-600 mx-auto col-span-5 font-semibold underline`}>
            {location.name}
          </span>
          <FoodList
            locationId={location.id}
            location={location}
            listType='ENTRY'
            entries={entries}
            internalScroll={isScrollable}
            useClone={Boolean(useClone)}
            setEntries={setEntries}
            searchTerm={searchTerm}
            isDragging={snapshot.isDragging}
          />
        </div>
      )}
    </Draggable>
  )
}
export default Column
