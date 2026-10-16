import { logger } from '../utils/logger'
import type { ApiResponse, Character, CharacterFilters } from '../types'

const BASE_URL = 'https://rickandmortyapi.com/api'

const EMPTY_RESPONSE: ApiResponse<Character> = {
    info: { count: 0, pages: 0, next: null, prev: null },
    results: [],
}

export async function getCharacters(
    page: number,
    filters: CharacterFilters,
    signal?: AbortSignal
): Promise<ApiResponse<Character>> {
    const params = new URLSearchParams({ page: String(page) })
    if (filters.name.trim()) params.set('name', filters.name.trim())
    if (filters.status) params.set('status', filters.status)
    if (filters.species.trim()) params.set('species', filters.species.trim())

    const url = `${BASE_URL}/character?${params}`
    logger.info('Fetching characters', { url, page, filters })

    let res: Response
    try {
        res = await fetch(url, { signal })
    } catch (err) {
        if ((err as Error).name === 'AbortError') throw err
        logger.error('Network error fetching characters', { url, error: (err as Error).message })
        throw new Error('No se pudo conectar con el servidor. Revisa tu conexión.')
    }

    if (res.status === 404) {
        logger.warn('No characters match filters', { filters })
        return EMPTY_RESPONSE
    }

    if (!res.ok) {
        logger.error('HTTP error fetching characters', { url, status: res.status })
        throw new Error(`Error ${res.status} al cargar personajes`)
    }

    const data: ApiResponse<Character> = await res.json()
    logger.info('Characters loaded', { count: data.results.length, totalPages: data.info.pages })
    return data
}