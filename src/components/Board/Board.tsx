import React, { Fragment, useState } from 'react'

import type { Entries, EntryMap, Location, Locations } from '../../types/types'

import type { DropResult, DraggableLocation, DroppableProvided } from 'react-beautiful-dnd'
import StrictModeDroppable from '../StrictModeDroppable'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'
import reorder, { reorderEntryMap } from '../../utils/reorder'

interface BoardProps {
  initial: EntryMap
  entries: Entries
  setEntries: (entries: any) => void
  searchTerm: string
  locations: Locations
  isScrollable?: boolean
  useClone?: boolean
};

const Board = (props: BoardProps) => {
  const [columns, setColumns] = useState(props.initial)
  const [ordered, setOrdered] = useState(Object.keys(props.initial))

  const onDragEnd = (result: DropResult) => {
    if (result.combine != null) {
      if (result.type === 'COLUMN') {
        const shallow = [...ordered]
        shallow.splice(result.source.index, 1)
        setOrdered(shallow)
        return
      }
      const column: Entries = props.initial[result.source.droppableId]
      const withEntryRemoved: Entries = [...column]
      withEntryRemoved.splice(result.source.index, 1)
      const columns: EntryMap = { ...props.initial, [result.source.droppableId]: withEntryRemoved }
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
      const ordered = reorder(Object.keys(props.initial), source.index, destination.index)
      setOrdered(ordered)
      return
    }

    const data = reorderEntryMap({
      EntryMap: columns,
      source,
      destination
    })

    setColumns(data.EntryMap)
  }

  const { setEntries, searchTerm, locations, isScrollable, useClone } = props

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId='board' type='COLUMN' direction='horizontal'>
          {(provided: DroppableProvided) => (
            <div className='grid grid-flow-col' ref={provided.innerRef} {...provided.droppableProps}>
              {locations.map((location: Location, index: number) => (
                <Fragment key={location.id}>
                <Column
                    // want to only pass in the entries that are in the current location
                    entries={props.entries.filter((entry: any) => entry.location === location)}
                    setEntries={setEntries}
                    searchTerm={searchTerm}
                    location={location}
                    index={index}
                    isScrollable={isScrollable}
                    useClone={useClone}
                    />
                </Fragment>
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
