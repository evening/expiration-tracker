
import React, { forwardRef, Fragment } from 'react'

import type { Location } from '../types/types'
import type { DraggableProvided, DraggableStateSnapshot, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'

import { Draggable } from 'react-beautiful-dnd'
import StrictModeDroppable from './StrictModeDroppable'
import FoodItem from './FoodItem'

import { getDraggingBackgroundColor } from '../utils/styles'

const Wrapper = ({ isDraggingOver, isDraggingFrom, isDropDisabled, children }:
{ isDraggingOver: boolean
  isDraggingFrom: boolean
  isDropDisabled?: boolean
  children: any }) => {
  return (
    <div className={`border-2 border-gray-100 bg-white ${getDraggingBackgroundColor(isDraggingOver, isDraggingFrom)} flex`}>
      {children}
    </div>
  )
}
import useEntriesState from '../hooks/useEntriesState'

interface DropZoneProps {
  children?: React.ReactNode
}

// eslint-disable-next-line react/display-name
const DropZone = forwardRef<HTMLDivElement, DropZoneProps>((props, ref) => {
  return (
    <div ref={ref} className='grid grid-cols-5 min-h-60 min-w-60'>
      {props.children}
    </div>
  )
})

interface InnerFoodListProps {
  location: Location
  searchTerm: string
}

const InnerFoodList = React.memo(
  function InnerFoodList (props: InnerFoodListProps) {
    const { entries } = useEntriesState('foods')
    const { location, searchTerm } = props
    return (
      <div>
        {entries.filter(entry => entry.location.name === location.name && entry.foodName.includes(searchTerm))
          .map((entry, index) => (
          <Draggable key={entry.id} draggableId={entry.id} index={index}>
            {(
              dragProvided: DraggableProvided,
              dragSnapshot: DraggableStateSnapshot
            ) => (
            <Fragment>
                <FoodItem
                  key={entry.id}
                  entry={entry}
                  index={index}
                  isDragging={dragSnapshot.isDragging}
                  provided={dragProvided}
                />
                </Fragment>
            )}
          </Draggable>
          ))
        }
      </div>
    )
  }
)

interface InnerListProps {
  dropProvided: DroppableProvided
  entries: Entries
  location: Location
  setEntries: (entries: any) => void
  searchTerm: string
}

function InnerList (props: InnerListProps) {
  const { dropProvided, location, entries, setEntries, searchTerm } = props
  return (
    <div id='container'>
      <h3 className="underline decoration-gray-400 inline font-bold">
        {location.name}
      </h3>
      <DropZone ref={(element: HTMLElement | null) => { dropProvided.innerRef(element) }}>
        <div className='col-span-1 font-semibold mx-auto'> Item </div>
        <div className='col-span-1 font-semibold mx-auto'> Expiration </div>
        <div className='col-span-1 font-semibold mx-auto'> Status </div>
        <div className='col-span-2 font-semibold mx-auto'> Action </div>
        <InnerFoodList
        entries={entries}
        location={location}
        searchTerm={searchTerm}
        setEntries={setEntries} />
        {dropProvided.placeholder}
      </DropZone>
    </div>
  )
}

interface Props {
  locationId: string
  listType?: string
  location: Location
  internalScroll?: boolean
  scrollContainerStyle?: any
  isDropDisabled?: boolean
  ignoreContainerClipping?: boolean
  useClone?: boolean
  searchTerm: string
};

const FoodList = (props: Props) => {
  const { entries } = useEntriesState('foods')
  const { locationId = 'LOCATION', listType, location, searchTerm, internalScroll, isDropDisabled, ignoreContainerClipping, useClone, isDragging } = props
  return (
    <StrictModeDroppable
      droppableId={locationId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      renderClone={
                    (useClone === true)
                      ? (provided, snapshot, rubric) => (
                    <FoodItem
                      entry={entries[rubric.source.index]}
                      index={rubric.source.index}
                      isDragging={snapshot.isDragging}
                      provided={provided}
                      />
                        )
                      : undefined
                  }
    >
      {(dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot
      ) => (
      <Wrapper
        isDraggingOver={dropSnapshot.isDraggingOver}
        isDropDisabled={isDropDisabled}
        isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
        {...dropProvided.droppableProps}
      >
        {(internalScroll === true)
          ? (
          <div className='max-h-** overflow-y-250'>
            <InnerList
              searchTerm={searchTerm}
              location={location}
              dropProvided={dropProvided}
              />
          </div>)
          : (<InnerList
            searchTerm={searchTerm}
            location={location}
            dropProvided={dropProvided}
          />
            )}
      </Wrapper>
      )}
    </StrictModeDroppable>
  )
}

export default FoodList
