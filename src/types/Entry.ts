interface Entry {
  foodName: string
  expiration: Date | null
  location: string
  id: string
}

interface EntryFromStorage {
  foodName: string
  expiration: string | null
  location: string
  id: string
}

type Entries = Entry[]

export type { Entry, EntryFromStorage, Entries }
