import React from 'react'
import type { Entry, Locations } from '../types/types'

import DatePicker from 'react-date-picker'

import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AddIcon from '@mui/icons-material/Add'
import CancelIcon from '@mui/icons-material/Cancel'

interface AddFoodButtonProps {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  locations: Locations
  setLocations: (locations: Locations) => void
}

const AddFoodButton = ({ locations, setLocations, setIsModalOpen, isModalOpen }: AddFoodButtonProps) => {
  const todayDate = dayjs()
  const defaultDate = todayDate.add(7, 'day').toDate()

  const [entryName, setEntryName] = React.useState<string>('')
  const [entryExpiration, setEntryExpiration] = React.useState<Date>(defaultDate)
  const [entryLocationName, setEntryLocationName] = React.useState<string>('Fridge')

  const addEntry = (newEntry: Entry): void => {
    const locationToUpdate = locations.get(newEntry.locationName)
    if (locationToUpdate == null) return undefined
    else {
      locationToUpdate.entries.push(newEntry)
      const updatedLocations = new Map(locations)
      updatedLocations.set(newEntry.locationName, locationToUpdate)
      setLocations(updatedLocations)
    }
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault()

    if (entryName === '') {
      alert('Please enter a Entry name')
    } else if (
      Array.from(locations.values())
        .some((location) => location
          .entries.some((entry) => entry.name === entryName))
    ) {
      alert('Item is already in the list!')
    } else {
      const newEntry: Entry =
      {
        name: entryName.trim(),
        locationName: entryLocationName,
        // design limitation of typescript: https://stackoverflow.com/questions/70723319/object-is-possibly-undefined-using-es6-map-get-right-after-map-set
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        locationId: locations.get(entryLocationName)!.id,
        expiration: entryExpiration,
        id: uuidv4()
      }
      addEntry(newEntry)

      // clear form
      setEntryExpiration(defaultDate)
      setEntryName('')
      setIsModalOpen(false)
    };
  }

  return (
    <div>
      <div className={`fixed z-10 inset-0 overflow-y-auto ${isModalOpen ? '' : 'hidden'}`}>
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white border-2 border-secondary-300 rounded-lg p-6 w-96">
                  <button className="p-1 ml-auto bg-transparent border-0 float-right leading-none outline-none focus:outline-none text-primary-300 hover:text-secondary-300 transition ease-in-out duration-150"
                      onClick={() => { setIsModalOpen(false) }}
                    >
                      <CancelIcon className='h-1 w-1 justify-end'/>
                  </button>
                  <span className="underline underline-offset-2 decoration-secondary-300 text-lg text-secondary-300">
                      Add Food
                  </span>
                  <div className='flex flex-col p-4'>
                    <span className='text-sm text-secondary-200 my-auto text-left'> Item: </span>
                    <input
                        className='py-1 px-2 border border-gray-300 !rounded-[50px] h-8 shadow-sm focus:outline-none focus:ring-secondary-300 focus:border-secondary-300'
                        name="newEntry"
                        type="text"
                        placeholder="New Entry"
                        onChange={(e) => { setEntryName(e.target.value) }}
                        value={entryName}
                        required
                    />
                    <span className='text-sm text-secondary-200 my-auto text-left'> Location: </span>
                    <select
                      className='py-1 border my-auto border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-300 focus:border-secondary-300'
                      name="location"
                      id="location"
                      onChange={(e) => { setEntryLocationName(e.target.value) }}
                    >
                    {Array.from(locations.keys()).map((locationName) => {
                      return <option key={locationName} value={locationName}> {locationName} </option>
                    })}
                    </select>
                    <span className='text-sm text-secondary-200 my-auto text-left'> Expires: </span>
                    <div className='mr-auto'>
                      <DatePicker
                        name="newExpiration"
                        format="y-MM-dd"
                        yearPlaceholder={defaultDate.getFullYear().toString()}
                        monthPlaceholder={(defaultDate.getMonth() + 1).toString()}
                        dayPlaceholder={defaultDate.getDate().toString()}
                        clearIcon={null}
                        value={entryExpiration}
                        locale="en-US"
                        onChange={(date: Date) => { setEntryExpiration(date) }}
                        className='bg-white mr-auto'
                      />
                      <small
                        onClick={handleSubmit}
                        className="text-primary-300 my-auto rounded outline-none focus:outline-none ease-linear transition-all duration-150 cursor-pointer hover:text-secondary-300 ml-auto"
                      >
                        <AddCircleIcon/>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>

      <button
        onClick={() => { setIsModalOpen(!isModalOpen) }}
        className="fixed bottom-5 right-5 bg-primary-300 text-white px-2 py-2 rounded-full outline-none z-50 focus:outline-none active:bg-secondary-300 focus:ring-2 focus:ring-offset-2 focus:ring-secondary-300"
      >
        <AddIcon />
      </button>
    </div>
  )
}

export default AddFoodButton
