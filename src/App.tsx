import React from 'react'

import './App.css'
import useStickyState from './utils/useStickyState'

// Components
import AddFood from './components/AddFood'
import SearchBar from './components/SearchBar'
import Board from './components/Board/Board'

function App () {
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  // TODO useStickyState should be an object and not a string
  const { entries, setEntries } = useStickyState('foods')

  return (
    <div className="App">
      <h1 className='underline decoration-gray-500 font-extrabold'>
        Food Tracker
      </h1>
      <AddFood
        entries={entries}
        setEntries={setEntries}
      />
      <hr />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <hr />
      <Board
        entries={entries}
        setEntries={setEntries}
        searchTerm={searchTerm}
      />
    </div>
  )
}

export default App
