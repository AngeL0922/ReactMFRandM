export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export interface LocationRef {
    name: string
    url: string
}

export interface Character {
    id: number
    name: string
    status: CharacterStatus
    species: string
    type: string
    gender: string
    origin: LocationRef
    location: LocationRef
    image: string
    episode: string[]
}

export interface Episode {
    id: number
    name: string
    air_date: string
    episode: string
}