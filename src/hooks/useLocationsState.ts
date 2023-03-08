import React from 'react'
import type { Locations } from '../types/types'

function useLocationsState (key: string) {
  const [locations, setLocations] = React.useState<Locations>(() => {
    return [
      { id: 'Fridge', name: 'Fridge' },
      { id: 'Freezer', name: 'Freezer' },
      { id: 'Pantry', name: 'Pantry' }
    ]
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(locations))
  }, [key, locations])

  return { locations, setLocations }
}

export default useLocationsState
