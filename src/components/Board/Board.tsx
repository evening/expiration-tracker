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
    console.log('result: ', result)
    console.log('locations: ', locations)
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
        console.log('sourceLocation is null')
        return undefined
      }
      const destLocation = locations.get(destination.droppableId)
      if (destLocation == null) {
        console.log('destLocation is null')
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
      console.log('locations: ', locations)
      const location = locations.get(source.droppableId)
      if (location == null) {
        console.log('location is null')
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
      <div className='grid grid-rows-3 gap-y-20'>
        {locationsArray.map((location) => (
          <div key={location.id} className='border-2 border-gray-100 bg-white w-5/6 mx-auto'>
            <h3 className="underline decoration-gray-400 inline font-bold">
              {location.name}
            </h3>
            <StrictModeDroppable droppableId={location.id} key={location.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps }
                  ref={provided.innerRef}
                  className="grid grid-cols-5 mx-auto"
                >
                  <div className='col-span-2 font-semibold mx-auto'> Item </div>
                  <div className='col-span-1 font-semibold mx-auto'> Expiration </div>
                  <div className='col-span-1 font-semibold mx-auto'> Status </div>
                  <div className='col-span-1 font-semibold mx-auto'> Action </div>
                  {location.entries.filter((entry: Entry) => entry.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((entry: Entry, index: number) => (
                    <Draggable key={entry.id} draggableId={entry.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? 'col-span-5 bg-gray-600' : 'col-span-5'}
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
