import { type Entry, type EntryMap, type Id } from '../types/types'
import type { DraggableLocation } from 'react-beautiful-dnd'

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default reorder

interface ReorderEntriesArguments {
  EntryMap: EntryMap
  source: DraggableLocation
  destination: DraggableLocation
}

export interface ReorderEntriesResult {
  EntryMap: EntryMap
}

export const reorderEntryMap = ({ EntryMap, source, destination }: ReorderEntriesArguments): ReorderEntriesResult => {
  const current: Entry[] = [...EntryMap[source.droppableId]]
  const next: Entry[] = [...EntryMap[destination.droppableId]]
  const target: Entry = EntryMap[source.droppableId][source.index]

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Entry[] = reorder(
      current,
      source.index,
      destination.index
    )
    const result: EntryMap = {
      ...EntryMap,
      [source.droppableId]: reordered
    }
    return {
      EntryMap: result
    }
  }

  // moving to different list:
  // 1. remove from original
  current.splice(source.index, 1)
  // 2. insert into next
  next.splice(destination.index, 0, target)

  const result: EntryMap = {
    ...EntryMap,
    [source.droppableId]: current,
    [destination.droppableId]: next
  }

  return {
    EntryMap: result
  }
}

interface List<T> {
  id: Id
  values: T[]
}

interface MoveBetweenArguments<T> {
  list1: List<T>
  list2: List<T>
  source: DraggableLocation
  destination: DraggableLocation
}

interface MoveBetweenResult<T> {
  list1: List<T>
  list2: List<T>
}

export function moveBetween<T> ({
  list1,
  list2,
  source,
  destination
}: MoveBetweenArguments<T>): MoveBetweenResult<T> {
  const newFirst = Array.from(list1.values)
  const newSecond = Array.from(list2.values)

  const moveFrom = source.droppableId === list1.id ? newFirst : newSecond
  const moveTo = moveFrom === newFirst ? newSecond : newFirst

  const [moved] = moveFrom.splice(source.index, 1)
  moveTo.splice(destination.index, 0, moved)

  return {
    list1: {
      ...list1,
      values: newFirst
    },
    list2: {
      ...list2,
      values: newSecond
    }
  }
}
