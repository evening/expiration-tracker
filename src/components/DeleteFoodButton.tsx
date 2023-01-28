import React, { Fragment } from 'react'

import type { Entries, Entry } from '../types/Entry'

interface DeleteFoodButtonProps {
  food: Entry
  entries: Entries
  setEntries: (entries: any) => void
};

const DeleteFoodButton = ({ food, entries, setEntries }: DeleteFoodButtonProps) => {
  const removeEntry = (food: Entry): void => {
    setEntries(entries.filter((v, i) => v !== food))
  }

  return (
    <Fragment>
      <small
        className="bg-red-600 text-white active:bg-red-700 font-bold text-sm px-1 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        onClick={() => { removeEntry(food) }}
      >
        [delete]
      </small>
    </Fragment>
  )
}

export default DeleteFoodButton
