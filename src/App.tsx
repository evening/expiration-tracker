import React from 'react'

import './App.css'

// Components
import AddFood from './components/AddFood'
import SearchBar from './components/SearchBar'
import Board from './components/Board/Board'
import useLocationsState from './hooks/useLocationsState'

function App () {
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const { locations, setLocations } = useLocationsState({ storageKey: 'locations' })

  return (
    <div className="App">
      <h1 className='underline decoration-gray-500 font-extrabold'>
        Food Tracker
      </h1>
      <AddFood
        locations={locations}
        setLocations={setLocations}
      />
      <hr className='w-5/6 mx-auto' />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <hr className='w-5/6 mx-auto' />
      <Board
        searchTerm={searchTerm}
        locations={locations}
        setLocations={setLocations}
      />
    </div>
  )
}

export default App
