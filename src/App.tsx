import React from 'react'

import './App.css'
import useStickyState from './utils/useStickyState'

// Components
import AddFood from './components/AddFood'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'
import ExampleTable from './components/ExampleLayouts'

function App () {
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  // TODO useStickyState should be an object and not a string
  const { entries, setEntries } = useStickyState('foods')

  return (
    <div className="App">
      <h1>Food Expiration Tracker</h1>
      <AddFood
        entries={entries}
        setEntries={setEntries}
      />
      <hr />
      <br />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <hr />
      <h2
        className="underline decoration-gray-500">
        Food List
      </h2>
      <FoodList
        entries={entries}
        setEntries={setEntries}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <hr />
      <ExampleTable />
    </div>
  )
}

export default App
