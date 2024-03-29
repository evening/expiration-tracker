import React from 'react'
import type { Entry, Locations } from '../types/types'

import DatePicker from 'react-date-picker'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

interface AddFoodProps {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  locations: Locations
  setLocations: (locations: Locations) => void
}

// IDEA: move this component to a plus button that expands on click
const AddFood = ({ locations, setLocations, setIsModalOpen, isModalOpen }: AddFoodProps) => {
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
      // TODO: replace obnoxious alert with something more elegant
      alert('Please enter a Entry name')
    } else if (
      Array.from(locations.values())
        .some((location) => location
          .entries.some((entry) => entry.name === entryName))
    ) {
      // TODO: replace obnoxious alert with something more elegant.
      // This should also only be a warning and should still allow user to add a new item w/same name
      // form validation message would be nicer
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
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
              <div className="grid grid-rows-3 gap-2">
                <div>
                  <p> Item: </p>
                  <input
                    className='py-1 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                    name="newEntry"
                    type="text"
                    placeholder="Enter Entry"
                    onChange={(e) => { setEntryName(e.target.value) }}
                    value={entryName}
                    required
                  />

                </div>
                <div>
                  <p> Storage: </p>
                  <select
                    className='py-1 border my-auto border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                    name="location"
                    id="location"
                    onChange={(e) => { setEntryLocationName(e.target.value) }}
                  >
                    {Array.from(locations.keys()).map((locationName) => {
                      return <option key={locationName} value={locationName}> {locationName} </option>
                    })}
                  </select>
                </div>
                <div className='row-span-1 lg:col-span-1 my-auto'>

                  <p> Expiration: </p>
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
                  />

                  <small
                    onClick={handleSubmit}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-1 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                  >
                    [add]
                  </small>
                </div>
              </div>
            </div></div>
        </div>
      </div>

      <button
        onClick={() => { setIsModalOpen(!isModalOpen) }}
        // onClick={() => { isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true) }}}
        className="fixed bottom-5 right-5 bg-indigo-600 text-white active:bg-indigo-700 font-bold text-xl px-3 py-2 rounded-full outline-none z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        +
      </button>
    </div>
  )
}

export default AddFood
