export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export interface Character {
    id: number
    name: string
    status: CharacterStatus
    species: string
    gender: string
    image: string
}

export type StatusFilter = '' | 'alive' | 'dead' | 'unknown'

export interface CharacterFilters {
    name: string
    status: StatusFilter
    species: string
}

export interface ApiInfo {
    count: number
    pages: number
    next: string | null
    prev: string | null
}

export interface ApiResponse<T> {
    info: ApiInfo
    results: T[]
}