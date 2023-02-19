import React, { useState } from 'react'

import FoodSublist from './FoodSublist'
import { Draggable, DragDropContext } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './StrictModeDroppable'

import { FoodLocations } from '../enums/FoodLocations'
import { type Entries } from '../types/Entry'

interface FoodListProps {
  entries: Entries
  setEntries: (entries: any) => void
  searchTerm: string
  setSearchTerm: (entries: any) => void
};

const FoodList = ({ entries, setEntries, searchTerm }: FoodListProps) => {
  const [colOrder, setColOrder] = useState<FoodLocations[]>(Object.values(FoodLocations))

  const onDragEnd = (result: any) => {
    if (result.destination === null) return
    if (result.type === 'location') {
      const sourceIndex = result.source.index
      const destinationIndex = result.destination.index
      setColOrder((locations) => {
        const newOrder = Array.from(locations)
        newOrder.splice(sourceIndex, 1)
        newOrder.splice(destinationIndex, 0, locations[sourceIndex])
        return newOrder
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="all-columns" direction="horizontal" type="location">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-rows-3 lg:grid-cols-3 gap-4 pt-2">
            {colOrder.map((location, index) => (
              <Draggable
              draggableId={location}
              index={index}
              key={location}
              >
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                    <FoodSublist
                      key={location}
                      index={index}
                      location={location}
                      entries={entries}
                      searchTerm={searchTerm}
                      setEntries={setEntries}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}

export default FoodList
