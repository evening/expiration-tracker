import React from 'react'

import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (entries: any) => void
};

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <div id='content' className='bg-transparent'>
      <label htmlFor='search' className='sr-only'> Search </label>
      <div
        dir='ltr'
        id='search-bar'
        className='group flex border-2 border-primary-300 rounded-[50px] h-[40px] w-11 transition-all duration-500 focus-within:w-[33%] focus-within:opacity-90 overflow-hidden ml-auto fixed z-10 bottom-20 right-5 overflow-y-auto '
      >
        <input
          type={'search'}
          placeholder='Apple'
          id='search-bar__input'
          aria-label='Search'
          className='flex-grow px-2 !border-0 focus:outline-0 !rounded-l-[50px] absolute top-0 bottom-0 left-0 opacity-0 group-focus-within:opacity-100 transition-all duration-500 cursor-pointer group-focus-within:cursor-default group-focus-within:w-[100%] text-primary-300'
          onChange={(e) => { setSearchTerm(e.target.value) }}
          value={searchTerm}
          required
        />
        <button
          id='search-bar__submit'
          aria-label='Submit search'
          className='cursor-pointer border-0 rounded-full bg-primary-300 px-2 text-white h-[34px] my-auto ml-auto  group-focus-within:outline-none transition-all duration-500 group-focus-within:focus:outline-0  !group-focus-within:hover:shadow-md z-10 active:bg-secondary-300 focus:ring-4  focus:ring-secondary-300'
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
