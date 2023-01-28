interface Entry {
  foodName: string
  expiration: Date | null
}

interface EntryFromStorage {
  foodName: string
  expiration: string | null
}

type Entries = Entry[]

export type { Entry, Entries, EntryFromStorage }
