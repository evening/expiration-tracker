import React from 'react'

import { Draggable, DragDropContext, type DropResult } from 'react-beautiful-dnd'
import { StrictModeDroppable } from '../StrictModeDroppable'

//  Types
import { type Location, type Entry, type Locations } from '../../types/types'

// Components
import FoodItem from '../FoodItem'

interface BoardProps {
  searchTerm: string
  locations: Locations
  setLocations: (locations: Locations) => void
};

const Board = ({ searchTerm, locations, setLocations }: BoardProps) => {
  const onDragEnd = (result: DropResult, locations: Locations, setLocations: { (locations: Locations): void, (arg0: Map<string, Location>): void }) => {
    if (result.destination === null) return
    const { source, destination } = result

    // did not move anywhere can bail early
    if (destination === undefined || source === undefined ||
       (destination.droppableId === source.droppableId &&
       destination.index === source.index)
    ) {
      return undefined
    } else if (source.droppableId !== destination.droppableId) {
      const sourceLocation = locations.get(source.droppableId)
      if (sourceLocation == null) {
        return undefined
      }
      const destLocation = locations.get(destination.droppableId)
      if (destLocation == null) {
        return undefined
      }
      const sourceEntries = sourceLocation.entries
      const destEntries = destLocation.entries
      const [removed] = sourceEntries.splice(source.index, 1)
      // update the entry's locationName and locationId
      removed.locationName = destLocation.name
      removed.locationId = destLocation.id
      // insert the entry into the destination location
      destEntries.splice(destination.index, 0, removed)
      const updatedLocations = new Map(locations)
      updatedLocations.set(source.droppableId, { ...sourceLocation, entries: sourceEntries })
      updatedLocations.set(destination.droppableId, { ...destLocation, entries: destEntries })
      setLocations(updatedLocations)
    } else if (source.droppableId === destination.droppableId) {
      const location = locations.get(source.droppableId)
      if (location == null) {
        return undefined
      }
      const copiedEntries = [...location.entries]
      const [removed] = copiedEntries.splice(source.index, 1)
      copiedEntries.splice(destination.index, 0, removed)
      const updatedLocations = new Map(locations)
      updatedLocations.set(source.droppableId, { ...location, entries: copiedEntries })
      setLocations(updatedLocations)
    }
  }

  const locationsArray = Array.from(locations.values())

  return (
    <DragDropContext
      onDragEnd={(result) => { onDragEnd(result, locations, setLocations) }}
    >
      <div className='grid grid-rows-3 gap-y-10 pt-1'>
        {locationsArray.map((location) => (
          <div key={location.id} className='border-2 border-neutral-100 bg-white w-5/6 mx-auto rounded-lg py-3 h-fit'>
            <h3 className="underline text-primary-300 inline font-bold">
              {location.name}
            </h3>
            <StrictModeDroppable droppableId={location.id} key={location.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps }
                  ref={provided.innerRef}
                  className="grid grid-cols-3 mx-auto"
                >
                  <div className='col-span-1 font-medium mx-auto text-primary-300'> Item </div>
                  <div className='col-span-1 font-medium mx-auto text-primary-300'> Expiration </div>
                  {location.entries.filter((entry: Entry) => entry.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((entry: Entry, index: number) => (
                    <Draggable key={entry.id} draggableId={entry.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? 'col-span-3 bg-base2-100 z-30 border-l-8 border-accent-100' : 'col-span-3'}
                        >
                          <FoodItem
                          food={entry}
                          locations={locations}
                          setLocations={setLocations}
                          />
                        </div>
                      )}
                    </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

export default Board
