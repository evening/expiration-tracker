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
// create location type as a map, name is the key, and the value is a Location
export type Locations = Map<string, Location>

// export type Location = Record<string, { id: Id, entries: Entries }>
// equivalent to:
// export interface Location {
//   [key: string]: {
//     id: string
//     entries: Entries
//   }
// }

// EXAMPLE:
// export interface Location {
//   [key: 'Fridge']: {
//     id: 'uuid string'
//     entries: entry[]
//   }
// }
