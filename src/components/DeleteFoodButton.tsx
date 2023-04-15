import React from 'react'

import type { Entry, Locations } from '../types/types'

interface DeleteFoodButtonProps {
  entry: Entry
  locations: Locations
  setLocations: (locations: Locations) => void
}

const DeleteFoodButton = ({ entry, locations, setLocations }: DeleteFoodButtonProps) => {
  const removeEntry = (entry: Entry): void => {
    const locationToUpdate = locations.get(entry.locationName)
    console.log('locationtoupdate: ', locationToUpdate)
    if (locationToUpdate == null) return undefined
    else {
      const updatedLocations = new Map(locations)
      const entries = locationToUpdate.entries.filter((e) => e.id !== entry.id)
      console.log(entries)
      const updatedLocation = { ...locationToUpdate, entries }
      console.log('updatedLocation: ', updatedLocation)
      updatedLocations.set(entry.locationName, updatedLocation)
      setLocations(updatedLocations)
    }
  }

  return (
      <small
        className="bg-red-600 text-white active:bg-red-700 font-bold text-sm px-1 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        onClick={() => { removeEntry(entry) }}
      >
        [delete]
      </small>
  )
}

export default DeleteFoodButton
