import React from 'react'
import { type Entries } from '../types/Entry'
import DatePicker from 'react-date-picker'

interface AddFoodProps {
  entries: Entries
  setEntries: (entries: any) => void
};

const AddFood = ({ entries, setEntries }: AddFoodProps) => {
  const todayDate = new Date()
  const defaultDate = addDays(todayDate, 7)
  const [newFoodName, setNewFoodName] = React.useState<string>('')
  const [newExpiration, setNewExpiration] = React.useState<Date>(defaultDate)

  function addDays (date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }
  const addEntry = (foodName: string, expiration: Date): void => {
    setEntries([...entries, { foodName, expiration }])
  }
  const handleSubmit = (e: any): void => {
    e.preventDefault()
    if (newFoodName === '') {
      // TODO: replace obnoxious alert with something more elegant
      alert('Please enter a food name')
    } else {
      addEntry(newFoodName, newExpiration)
      setNewFoodName('')
    };
  }
  return (
    <div>
      <input
        name="newFood"
        type="text"
        placeholder="Enter food"
        onChange={(e) => { setNewFoodName(e.target.value) }}
        value={newFoodName}
        required
      />
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
  )
}

export default AddFood
