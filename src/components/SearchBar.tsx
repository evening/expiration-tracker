import React from 'react'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (entries: any) => void
};

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => { setSearchTerm(e.target.value) }}
        value={searchTerm}
      />
    </div>
  )
}

export default SearchBar
