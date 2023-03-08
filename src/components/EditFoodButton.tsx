import React, { Fragment, type ReactElement, type SyntheticEvent } from 'react'
import { type Entries, type Entry, type Location } from '../types/types'
import DatePicker from 'react-date-picker'

import useEntriesState from '../hooks/useEntriesState'

interface EditFoodButtonProps {
  entry: Entry
  index: number
};

function EditFoodButton ({ entry, index }: EditFoodButtonProps): ReactElement {
  const { entries, setEntries } = useEntriesState('foods')
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [editedFood, setEditedFood] = React.useState<string>(entry.foodName)
  const [editedExpiration, setEditedExpiration] = React.useState<Date | null>(entry.expiration)
  const [editedLocation, setEditedLocation] = React.useState<Location>(entry.location)

  const handleEdit = (e: SyntheticEvent): void => {
    e.preventDefault()
    if (editedExpiration === null || editedFood === '') {
      // TODO: replace obnoxious alert with something more elegant
      alert('Do not leave food name or expiration date blank')
    } else {
      const newEntries: Entries = entries.map((currentEntry, currentIndex) => currentIndex === index
        ? { foodName: editedFood, location: editedLocation, expiration: editedExpiration, id: entry.id }
        : entry)
      setEntries(newEntries)
      setShowModal(false)
    }
  }
  const handleClose = (): void => {
    setEditedFood(entry.foodName)
    setEditedLocation(entry.location)
    setEditedExpiration(entry.expiration)
    setShowModal(false)
  }

  return (
    <>
      <button
        className="bg-amber-500 text-white active:bg-amber-600 font-bold text-sm px-1 py-1 mx-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        type="button"
        onClick={() => { setShowModal(true) }}
      >
        [edit]
      </button>
      {showModal
        ? (
          <Fragment>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Edit Food
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => { setShowModal(false) }}
                    >
                      <span
                        className="text-black opacity-30 h-2 w-2 text-2xl">
                        &times;
                      </span>
                    </button>
                  </div>
                  <div>
                    <input
                      name="entry-name"
                      type="text"
                      id="entryName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={entry.foodName}
                      value={editedFood}
                      onChange={e => { setEditedFood(e.target.value) }}
                      required />
                    <select
                      className='py-1 border my-auto border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                      name="location"
                      id="location"
                      value={editedLocation.name}
                      onChange={(e) => { setEditedLocation({ ...editedLocation, name: e.target.value }) }}
                    >
                      <option value={'fridge'}> Fridge </option>
                      <option value={'freezer'}> Freezer </option>
                      <option value={'pantry'}> Pantry </option>
                    </select>
                    <DatePicker
                      name="editedExpiration"
                      className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                      format="y-MM-dd"
                      yearPlaceholder="yyyy"
                      monthPlaceholder="mm"
                      dayPlaceholder="dd"
                      clearIcon={null}
                      value={editedExpiration}
                      locale="en-US"
                      onChange={(date: Date) => { setEditedExpiration(date) }}
                    />
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-amber-500 text-white active:bg-amber-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
          )
        : null}
    </>
  )
}

export default EditFoodButton
