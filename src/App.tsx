import React, { Fragment } from 'react'

import './App.css'
import useStickyState from './utils/useStickyState'
import type { Entries, Entry } from './types/Entry'

// Components
import DatePicker from 'react-date-picker'
import EditFood from './components/EditFood'
import SearchBar from './components/SearchBar'

function App () {
  const todayDate = new Date()
  const defaultDate = addDays(todayDate, 7)
  // State for the input form
  const [newFoodName, setNewFoodName] = React.useState<string>('')
  const [newExpiration, setNewExpiration] = React.useState<Date>(defaultDate)
  const [searchTerm, setSearchTerm] = React.useState<string>('')

  // TODO useStickyState should be an object and not a string
  const { entries, setEntries } = useStickyState<Entries>('foods')

  function addDays (date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const addEntry = (foodName: string, expiration: Date): void => {
    setEntries([...entries, { foodName, expiration }])
  }

  const removeEntry = (food: Entry): void => {
    setEntries(entries.filter((v, i) => v !== food))
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault()
    if (newFoodName === '') {
      // TODO: replace obnoxious alert with a modal--find form validation one from YelpCamp!
      alert('Please enter a food name')
    } else {
      addEntry(newFoodName, newExpiration)
      setNewFoodName('')
    };
  }

  return (
    <div className="App">
      <h1>Food Expiration Tracker</h1>
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
        {/* TODO: move add into its own component  */}
        <small
          onClick={handleSubmit}
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-1 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        >
          [add]
        </small>
        <hr />
        <br />
      </div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <hr />
      <h2
        className="underline decoration-gray-500">
        Food List
      </h2>
      <ul>
        {entries.filter(entry => { if (searchTerm != null) { return entry.foodName.includes(searchTerm) } return entry })
          .map((food, index) =>
            <li key={index}>
              <>
                {food.foodName} | {(food.expiration != null) ? new Date(food?.expiration).toLocaleDateString() : ''}
                <small>
                  <EditFood
                    food={food}
                    index={index}
                    entries={entries}
                    setEntries={setEntries}
                  />
                </small>
                {/* TODO: move delete button into its own component */}
                <small
                  className="bg-red-600 text-white active:bg-red-700 font-bold text-sm px-1 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                  onClick={() => { removeEntry(food) }}
                >
                  [delete]
                </small>
              </>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default App
