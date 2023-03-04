interface Entry {
  foodName: string
  expiration: Date | null
  location: string
}

interface EntryFromStorage {
  foodName: string
  expiration: string | null
  location: string
}

type Entries = Entry[]

export type { Entry, Entries, EntryFromStorage }
