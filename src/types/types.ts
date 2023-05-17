export type Id = string

export interface Entry {
  id: Id
  name: string
  expiration: Date | null
  locationName: string
  locationId: Id
}

export interface EntryFromStorage {
  id: Id
  name: string
  expiration: string | null
  locationName: string
  locationId: Id
}

export type Entries = Entry[]

export interface Location {
  name: string
  id: Id
  entries: Entries
}

export type Locations = Map<string, Location>
