import React from 'react'

import { Draggable } from 'react-beautiful-dnd'
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import FoodList from '../FoodList'
import type { Entries, Location } from '../../types/types'
import { getLocationDraggingBackgroundColor } from '../../utils/styles'

interface HeaderProps {
  isDragging: boolean
  children: any
}

const Header = ({ isDragging, children }: HeaderProps) => {
  return (
      <div className={`border-4 border-gray-100 bg-white ${getLocationDraggingBackgroundColor(isDragging)} transition ease-linear hover:bg-blue-600 mx-auto col-span-5`}>
        {children}
      </div>
  )
}

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
        <div id='container' className='grid grid-cols-5' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Header isDragging={snapshot.isDragging}>
            {location.name}
          </Header>
          <FoodList
            locationId={location.id}
            location={location}
            listType='ENTRY'
            entries={entries}
            internalScroll={isScrollable}
            useClone={Boolean(useClone)}
            setEntries={setEntries}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </Draggable>
  )
}
export default Column
