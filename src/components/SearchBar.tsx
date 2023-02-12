import React from 'react'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (entries: any) => void
};

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <div className='py-4'>
      <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"> Search </label>
          <input
          type="search"
          id="search"
          className='py-1 px-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
          placeholder="Search"
          onChange={(e) => { setSearchTerm(e.target.value) }}
          value={searchTerm}
          required
          />
      </div>
  )
}

export default SearchBar
