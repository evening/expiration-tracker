import React from 'react'
import type { Locations, Location } from '../types/types'

const defaultLocations: Locations = new Map<string, Location>(
  [
    ['Fridge', { name: 'Fridge', id: 'Fridge', entries: [] }],
    ['Freezer', { name: 'Freezer', id: 'Freezer', entries: [] }],
    ['Pantry', { name: 'Pantry', id: 'Pantry', entries: [] }]
  ]
)

interface LocationsState {
  locations: Locations
  setLocations: React.Dispatch<React.SetStateAction<Locations>>
}

interface LocationsStateOptions {
  storageKey: string
}

function useLocationsState ({ storageKey }: LocationsStateOptions): LocationsState {
  const [locations, setLocations] = React.useState<Locations>(() => {
    // TODO: need to handle possible exception from .getItem
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stickyValue = window.localStorage.getItem(storageKey)
    try {
      if (stickyValue !== null) {
        return (new Map(JSON.parse(stickyValue)))
      } else {
        return defaultLocations
      }
    } catch (error) {
      console.log(error)
      return defaultLocations
    }
  })

  // set locations in local storage
  React.useEffect(() => {
    // TODO: need to handle possible exception from .setItem
    window.localStorage.setItem(storageKey, JSON.stringify(Array.from(locations.entries())))
    console.log('locations: ', locations)
  }, [storageKey, locations])

  return { locations, setLocations }
}

export default useLocationsState
