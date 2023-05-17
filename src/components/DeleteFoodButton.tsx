import React from 'react'

import type { Entry, Locations } from '../types/types'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'

interface DeleteFoodButtonProps {
  entry: Entry
  locations: Locations
  setLocations: (locations: Locations) => void
}

const DeleteFoodButton = ({ entry, locations, setLocations }: DeleteFoodButtonProps) => {
  const removeEntry = (entry: Entry): void => {
    const locationToUpdate = locations.get(entry.locationName)
    if (locationToUpdate == null) return undefined
    else {
      const updatedLocations = new Map(locations)
      const entries = locationToUpdate.entries.filter((e) => e.id !== entry.id)
      const updatedLocation = { ...locationToUpdate, entries }
      updatedLocations.set(entry.locationName, updatedLocation)
      setLocations(updatedLocations)
    }
  }

  return (
      <small
        className="bg-red-600 text-secondary-300 hover:text-neutral font-bold text-sm px-1 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        onClick={() => { removeEntry(entry) }}
      >
        <DeleteTwoToneIcon
        />
      </small>
  )
}

export default DeleteFoodButton
