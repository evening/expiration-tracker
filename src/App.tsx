import React from 'react'

import './App.css'

// Components
import AddFood from './components/AddFood'
import SearchBar from './components/SearchBar'
import Board from './components/Board/Board'

function App () {
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  return (
    <div className="App">
      <h1 className='underline decoration-gray-500 font-extrabold'>
        Food Tracker
      </h1>
      <AddFood/>
      <hr />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <hr />
      <Board
        searchTerm={searchTerm}
        />
    </div>
  )
}

export default App
