import React from 'react'

import type { Entry } from '../types/types'

import useEntriesState from '../hooks/useEntriesState'

interface DeleteFoodButtonProps {
  entry: Entry
};

const DeleteFoodButton = ({ entry }: DeleteFoodButtonProps) => {
  const { entries, setEntries } = useEntriesState('foods')
  const removeEntry = (entry: Entry): void => {
    setEntries(entries.filter((v, i) => v !== entry))
  }

  return (
      <small
        className="bg-red-600 text-white active:bg-red-700 font-bold text-sm px-1 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        onClick={() => { removeEntry(entry) }}
      >
        [delete]
      </small>
  )
}

export default DeleteFoodButton
