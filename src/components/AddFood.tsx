import React from 'react'
import { FoodLocation } from '../constants/FoodLocation'
import { type Entries } from '../types/Entry'
import DatePicker from 'react-date-picker'
import dayjs from 'dayjs'

interface AddFoodProps {
  entries: Entries
  setEntries: (entries: any) => void
};

const AddFood = ({ entries, setEntries }: AddFoodProps) => {
  const todayDate = dayjs()
  const defaultDate = todayDate.add(7, 'day').toDate()

  const [newFoodName, setNewFoodName] = React.useState<string>('')
  const [newExpiration, setNewExpiration] = React.useState<Date>(defaultDate)
  const [newLocation, setNewLocation] = React.useState<string>('Fridge')

  const addEntry = (foodName: string, location: string, expiration: Date): void => {
    setEntries([...entries, { foodName, location, expiration }])
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
      addEntry(newFoodName, newLocation, newExpiration)
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
        onChange={(e) => { setNewLocation(e.target.value) }}
        >
          <option value={FoodLocation.fridge}> Fridge </option>
          <option value={FoodLocation.freezer}> Freezer </option>
          <option value={FoodLocation.pantry}> Pantry </option>
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
