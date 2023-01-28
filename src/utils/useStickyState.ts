import React from 'react'

function useStickyState<T> (key: string) {
  const [entries, setEntries] = React.useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key)
    if (stickyValue === null) {
      return []
    }
    return JSON.parse(stickyValue, (key: any, value: any) => {
      if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
        return new Date(value)
      }
      return value
    })
  })
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(entries, (key: any, value: any) => {
      if (value instanceof Date) {
        return value.toISOString()
      }
      return value
    }))
  }, [key, entries])
  return { entries, setEntries }
}
export default useStickyState
