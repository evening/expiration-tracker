import React from 'react'
import type { Entry } from './../types/Entry'

function useStickyState<T> (key: string) {
  const [entries, setEntries] = React.useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key)
    if (stickyValue === null) {
      return []
    }
    return JSON.parse(stickyValue).map((entry: Entry) => {
      if ((entry?.expiration) != null) {
        entry.expiration = new Date(entry.expiration)
      }
      return entry
    })
  })
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(entries))
  }, [key, entries])
  return { entries, setEntries }
}
export default useStickyState
