import React from 'react'
import type { Entries, EntryFromStorage } from '../types/types'

function useEntriesState (key: string) {
  const [entries, setEntries] = React.useState<Entries>(() => {
    const stickyValue = window.localStorage.getItem(key)
    if (stickyValue === null) {
      return []
    }
    return JSON.parse(stickyValue).map((entry: EntryFromStorage) => {
      return {
        foodName: entry.foodName,
        expiration: (entry?.expiration != null) ? new Date(entry.expiration) : null,
        location: {
          id: entry.location.id,
          name: entry.location.name
        }
      }
    })
  })
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(entries))
  }, [key, entries])
  return { entries, setEntries }
}
export default useEntriesState
