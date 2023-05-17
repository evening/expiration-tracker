import React, { Fragment, type ReactElement, type SyntheticEvent } from 'react'
import { type Locations, type Entry } from '../types/types'
import DatePicker from 'react-date-picker'
import CreateIcon from '@mui/icons-material/Create'
import CancelIcon from '@mui/icons-material/Cancel'
import LockIcon from '@mui/icons-material/Lock'
import CheckIcon from '@mui/icons-material/Check'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Tooltip from '@mui/material/Tooltip'

interface EditFoodButtonProps {
  entry: Entry
  locations: Locations
  setLocations: (locations: Locations) => void
};

function EditFoodButton ({ entry, locations, setLocations }: EditFoodButtonProps): ReactElement {
  const editEntry = (entry: Entry, editedName: string, editedExpiration: Date): void => {
    if (editedExpiration === null || editedName === '') {
      // TODO: replace obnoxious alert with something more elegant
      // disable confirm if either field is empty
      alert('Do not leave food name or expiration date blank')
    } else {
      const locationToUpdate = locations.get(entry.locationName)
      if (locationToUpdate == null) return undefined
      else {
        const newEntries = [...locationToUpdate.entries]
        const editedIndex = newEntries.indexOf(entry)
        newEntries[editedIndex] = { ...entry, name: editedName, expiration: editedExpiration }
        const newLocation = { ...locationToUpdate, entries: newEntries }
        const updatedLocations = new Map(locations)
        updatedLocations.set(entry.locationName, newLocation)
        setLocations(updatedLocations)
      }
    }
  }

  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [editedName, setEditedName] = React.useState<string>(entry.name)
  const [editedExpiration, setEditedExpiration] = React.useState<Date | null>(entry.expiration)

  const handleEdit = (e: SyntheticEvent): void => {
    e.preventDefault()

    if (editedExpiration === null || editedName === '') {
      alert('Do not leave food name or expiration date blank')
    } else {
      editEntry(entry, editedName, editedExpiration)
      setShowModal(false)
    }
  }
  const handleClose = (): void => {
    setEditedName(entry.name)
    setEditedExpiration(entry.expiration)
    setShowModal(false)
  }

  // TODO: disable dragging while modal is open
  return (
    <>
      <button
        className="text-secondary-300 hover:text-neutral font-bold text-sm px-1 py-1 mx-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        type="button"
        onClick={() => { setShowModal(true) }}
      >
        <CreateIcon />
      </button>
      {showModal
        ? (
          <Fragment>
            <div className="justify-center items-center flex absolute inset-0 z-10 outline-none focus:outline-none" >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-2 border-secondary-300 rounded-lg shadow-lg relative p-3 flex flex-col w-full bg-white">
                  <div className='flex items-start justify-between p-2 border-secondary-300'>
                    <span className="pb-2 pl-2 underline underline-offset-2 decoration-secondary-300 text-lg text-secondary-300 text-center">
                      Edit Food
                    </span>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-primary-300 float-right leading-none outline-none focus:ring-secondary-300 focus:outline-none"
                      onClick={() => { setShowModal(false) }}
                    >
                      <CancelIcon />
                    </button>
                  </div>
                  <div className='flex flex-col justify-between pt-3' >
                    <div className='flex flex-row'>
                    <label htmlFor='name' className='my-auto pr-2 text-sm text-secondary-300'> Name: </label>
                    <input
                      name="food-name"
                      type="text"
                      id="name"
                      className="bg-base3-300 border border-gray-300 text-primary-300 !rounded-lg focus:ring-primary-300 focus:border-primary-300 block w-full px-3 invalid:[&:not(:placeholder-shown):not(:focus)]:border-danger-500 h-9"
                      formNoValidate
                      placeholder={entry.name}
                      value={editedName}
                      onChange={e => { setEditedName(e.target.value) }}
                      required />
                    </div>
                    <Tooltip title="To change an item's location, drag it on the board" placement='top-start'>
                      <div className='flex flex-row'>
                        <span className='my-auto pr-2 text-sm text-secondary-300'>
                        Location:
                        </span>
                        <span className='my-auto pl-2 py-1 text-primary-300 justify-self-end rounded-md focus:outline-none cursor-not-allowed w-3/4'>
                          <LockIcon/>
                          {entry.locationName}
                        </span>
                      </div>
                    </Tooltip>
                    <div className='flex flex-row p-0 rounded-lg '>
                    <span className='my-auto pr-2 text-sm text-secondary-300'> Expires: </span>
                      <DatePicker
                        name="editedExpiration"
                        className={'text-primary-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'}
                        format="y-MM-dd"
                        yearPlaceholder="yyyy"
                        monthPlaceholder="mm"
                        dayPlaceholder="dd"
                        clearIcon={null}
                        value={(editedExpiration != null) ? new Date(editedExpiration) : new Date()}
                        locale="en-US"
                        onChange={(date: Date) => { setEditedExpiration(date) }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-b">
                  <div className='bg-success-200 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'>
                      <button
                        className="text-white px-6 py-1 mr-1 mb-1"
                        type="button"
                        onClick={handleEdit}
                      >
                        <CheckIcon className='h-4 w-4 justify-end'/>
                      </button>
                    </div>
                    <div className='bg-danger-200 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'>
                      <button
                        className="text-white px-6 py-1 mr-1 mb-1 "
                        type="button"
                        onClick={handleClose}
                      >
                        <HighlightOffIcon className='h-4 w-4 justify-end'/>
                      </button>
                    </div>
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
