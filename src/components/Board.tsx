import React, { Fragment, useRef, useState } from 'react'

import type { Entries, EntryMap, Location } from '../types/types'
import type { DropResult, DraggableProvided, DraggableStateSnapshot, DraggableLocation, DroppableProvided } from 'react-beautiful-dnd'
import StrictModeDroppable from './StrictModeDroppable'

import FoodList from './FoodList'
import { Draggable, DragDropContext } from 'react-beautiful-dnd'
import reorder, { reorderEntryMap } from '../utils/reorder'
import { getLocationDraggingBackgroundColor } from '../utils/styles'

interface HeaderProps {
  isDragging: boolean
  children: any
}

const Header = ({ isDragging, children }: HeaderProps) => {
  return (
      <div className={`border-2 border-gray-100 bg-white ${getLocationDraggingBackgroundColor(isDragging)} flex transition ease-linear hover:bg-blue-600`}>
        {children}
      </div>
  )
}

interface BoardProps {
  title: string
  entries: Entries
  setEntries: (entries: any) => void
  searchTerm: string
  index: number
  location: Location
  isScrollable?: boolean
  useClone?: boolean
};

const Board = (props: BoardProps) => {
  const [columns, setColumns] = useState(props.initial))
  const [ordered, setOrdered] = useState(Object.keys(props.initial))
  const boardRef = useRef(null)

  ondragend = (result: DropResult) => {
    if (result.combine != null) {
      if (result.type === 'COLUMN') {
        const shallow = [...ordered]
        shallow.splice(result.source.index, 1)
        setOrdered(shallow)
        return
      }
      const column: Entries = columns[result.source.droppableId]
      const withEntryRemoved: Entries = [...column]
      withEntryRemoved.splice(result.source.index, 1)
      const columns: EntryMap = { ...columns, [result.source.droppableId]: withEntryRemoved }
      setColumns(columns)
      return
    }

    // dropped nowhere
    if (result.destination == null) {
      return
    }

    const source: DraggableLocation = result.source
    const destination: DraggableLocation = result.destination

    // did not move anywehre, can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    // reordering column
    if (result.type === 'COLUMN') {
      const ordered = reorder(ordered, source.index, destination.index)
      setOrdered(ordered)
      return
    }

    const data = reorderEntryMap({
      EntryMap: columns,
      source,
      destination,
    })

    setColumns(data.EntryMap)
  }

  const { title, entries, setEntries, searchTerm, location, isScrollable, useClone } = props

  return (
    <Fragment>
      <DragDropContext onDragEnd={ondragend}>
        <StrictModeDroppable droppableId='board' type='COLUMN' direction='horizontal'>
          {(provided: DroppableProvided) => (
            <div id='container' ref={provided.innerRef} {...provided.droppableProps}>
              {ordered.map((key: string, index: number) => (
                // top of column
                <Draggable key={location.name} draggableId={title} index={index}>
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div id='container' className='flex flex-col' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Header isDragging={snapshot.isDragging}>
                        {title}
                      </Header>
                      <FoodList
                        locationId={title}
                        listType='ENTRY'
                        entries={entries}
                        internalScroll={isScrollable}
                        useClone={Boolean(useClone)}
                        location={location}
                        setEntries={setEntries}
                        searchTerm={searchTerm}
                        />
                    </div>
                  )}
                </Draggable>
                // bottom of column
              ))}
              {provided.placeholder}

            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </Fragment>
  )
}

export default Board
