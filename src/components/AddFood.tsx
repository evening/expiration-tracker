import React from 'react'

import DatePicker from 'react-date-picker'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

import useEntriesState from '../hooks/useEntriesState'
import useLocationsState from '../hooks/useLocationsState'

import { type Location } from '../types/types'

const AddFood = () => {
  const { locations } = useLocationsState('locations')

  const todayDate = dayjs()
  const defaultDate = todayDate.add(7, 'day').toDate()

  const { entries, setEntries } = useEntriesState('foods')
  const [newFoodName, setNewFoodName] = React.useState<string>('')
  const [newExpiration, setNewExpiration] = React.useState<Date>(defaultDate)
  // set default new location as the fridge location object
  // TODO: set up locations object in local storage
  const [newLocation, setNewLocation] = React.useState<Location>(locations[0])

  const addEntry = (foodName: string, location: Location, expiration: Date, id: string): void => {
    setEntries([...entries, { foodName, location, expiration, id: uuidv4() }])
    setNewExpiration(defaultDate)
  }
  const handleSubmit = (e: any): void => {
    e.preventDefault()
    if (newFoodName === '') {
      // TODO: replace obnoxious alert with something more elegant
      alert('Please enter a food name')
    } else if (entries.some((entry) => entry.foodName === newFoodName)) {
      // TODO: replace obnoxious alert with something more elegant
      alert('Item is already in the list!')
    } else {
      addEntry(newFoodName, newLocation, newExpiration, uuidv4())
      setNewFoodName('')
    };
  }
  return (
    <div className='grid grid-rows-1 lg:grid-cols-5 py-4'>
      <div className='row-span-1 lg:col-start-2 col-span-1 mx-auto'>
      <p> Item: </p>
      <input
        className='py-1 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
        name="newFood"
        type="text"
        placeholder="Enter food"
        onChange={(e) => { setNewFoodName(e.target.value) }}
        value={newFoodName}
        required
      />
      </div>
      <div className='row-span-1 lg:col-span-1 mx-auto my-auto'>
      <p> Storage: </p>
        <select
        className='py-1 border my-auto border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
        name="location"
        id="location"
        onChange={(e) => { setNewLocation({ id: e.target.value, name: e.target.value }) }}
        >
          <option value={'fridge'}> Fridge </option>
          <option value={'freezer'}> Freezer </option>
          <option value={'pantry'}> Pantry </option>
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
        value={newExpiration}
        locale="en-US"
        onChange={(date: Date) => { setNewExpiration(date) }}
      />
      <small
        onClick={handleSubmit}
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-1 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
      >
        [add]
      </small>
      </div>
    </div>
  )
}

export default AddFood
