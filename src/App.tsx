import React from 'react'

import './App.css'

// Components
import AddFoodButton from './components/AddFoodButton'
import SearchBar from './components/SearchBar'
import Board from './components/Board/Board'
import useLocationsState from './hooks/useLocationsState'

function App () {
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false)
  const { locations, setLocations } = useLocationsState({ storageKey: 'locations' })

  return (
    <div className="App bg-base1-300">
      <h1 className='text-primary-300 text-3xl my-auto py-2'>
        Food Tracker
      </h1>
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
      <AddFoodButton
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        locations={locations}
        setLocations={setLocations}
      />
    </div>
  )
}

export default App
