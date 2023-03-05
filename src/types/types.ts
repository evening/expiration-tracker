
import type { DraggableId, DraggableLocation } from 'react-beautiful-dnd'

export type Id = string

export interface Entry {
  id: Id
  foodName: string
  expiration: Date | null
  location: Location
}

export interface EntryFromStorage {
  id: Id
  foodName: string
  expiration: string | null
  location: string
}

export type Entries = Entry[]

export interface Location {
  id: Id
  name: string
}

export interface LocationColors {
  soft: string
  hard: string
  default: string
}

export interface Dragging {
  id: DraggableId
  location: DraggableLocation
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface EntryMap {
  [key: string]: Entry[]
}

// @flow
// import type { DraggableId, DraggableLocation } from '../../src/types';

// this is the UUID for each item
// export type Id = string;

// this is the LOCATION COLOR for me
// export type AuthorColors = {|
//   soft: string,
//   hard: string,
// |};

// this is the LOCATION for me
// export type Author = {|
//   id: Id,
//   name: string,
//   avatarUrl: string,
//   url: string,
//   colors: AuthorColors,
// |};

// this is the ENTRY for me
// export type Quote = {|
//   id: Id,
//   content: string,
//   author: Author,
// |};

// export type Dragging = {|
//   id: DraggableId,
//   location: DraggableLocation,
// |};

// this will be "foodmap" for me
// export type QuoteMap = {
//   [key: string]: Quote[],
// };

// export type Task = {|
//   id: Id,
//   content: string,
// |};
