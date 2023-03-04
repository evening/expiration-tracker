import React from 'react'
import type { Entries, EntryFromStorage } from '../types/Entry'

export function useStickyState (key: string) {
  const [entries, setEntries] = React.useState<Entries>(() => {
    const stickyValue = window.localStorage.getItem(key)
    if (stickyValue === null) {
      return []
    }
    return JSON.parse(stickyValue).map((entry: EntryFromStorage) => {
      return {
        foodName: entry.foodName,
        expiration: (entry?.expiration != null) ? new Date(entry.expiration) : null,
        location: entry.location,
        id: entry.id
      }
    })
  })
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(entries))
  }, [key, entries])
  return { entries, setEntries }
}

export const clone = (data: any) => {
  return JSON.parse(JSON.stringify(data))
}

// we don't have columns property on our "data", so going to need to fix that.
export const removeEntryFromLocation = (data: any, { droppableId, index }: any) => {
  data = clone(data)
  data.columns[droppableId].foodIds.splice(index, 1)
  return data
}

export const addEntryToLocation = (data: any, { droppableId, index }: any, foodId: string) => {
  data = clone(data)
  data.columns[droppableId].foodIds.splice(index, 0, foodId)
  return data
}

export const onChange = (source: { droppableId: any, index: any }, destination: { droppableId: any, index: any }) => {
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return true
  }
  return false
}
