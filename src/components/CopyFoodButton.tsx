import React, { Fragment } from 'react'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { type Entry, type Locations } from '../types/types'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

interface CopyFoodButtonProps {
  entry: Entry
  locations: Locations
  setLocations: (locations: Locations) => void
}

const CopyFoodButton = ({ entry, locations, setLocations }: CopyFoodButtonProps) => {
  const todayDate = dayjs()
  const defaultDate = todayDate.add(7, 'day').toDate()

  const duplicateEntry = (entry: Entry): void => {
    const locationToUpdate = locations.get(entry.locationName)
    if (locationToUpdate == null) return undefined
    else {
      const updatedLocations = new Map(locations)
      const newEntry = { ...entry, id: uuidv4(), expiration: defaultDate }
      const updatedLocation = { ...locationToUpdate, entries: [...locationToUpdate.entries, newEntry] }
      updatedLocations.set(entry.locationName, updatedLocation)
      setLocations(updatedLocations)
    }
  }

  return (
    <Fragment>
      <small
        className="text-secondary-300 hover:text-neutral text-sm px-1 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        onClick={() => { duplicateEntry(entry) }}
      >
      <ContentCopyOutlinedIcon />
      </small>
    </Fragment>
  )
}

export default CopyFoodButton
