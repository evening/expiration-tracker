import React from 'react'

import './App.css'
import useStickyState from './utils/useStickyState'

// Components
import AddFood from './components/AddFood'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App () {
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  // TODO useStickyState should be an object and not a string
  const { entries, setEntries } = useStickyState('foods')

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  return (
    <div className="App">
      <h1 className='underline decoration-gray-500 font-extrabold'>
        Food Tracker
      </h1>
      <AddFood
        entries={entries}
        setEntries={setEntries}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <hr />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <hr />
      <FoodList
        entries={entries}
        setEntries={setEntries}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  )
}

export default App
