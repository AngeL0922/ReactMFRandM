import { logger } from '../utils/logger'
import type { Character, Episode } from '../types'

const BASE_URL = 'https://rickandmortyapi.com/api'

async function fetchJson<T>(url: string, notFoundMessage: string, signal?: AbortSignal): Promise<T> {
    let res: Response
    try {
        res = await fetch(url, { signal })
    } catch (err) {
        if ((err as Error).name === 'AbortError') throw err
        logger.error('Network error', { url, error: (err as Error).message })
        throw new Error('No se pudo conectar con el servidor. Revisa tu conexión.')
    }

    if (res.status === 404) {
        logger.warn('Resource not found', { url })
        throw new Error(notFoundMessage)
    }

    if (!res.ok) {
        logger.error('HTTP error', { url, status: res.status })
        throw new Error(`Error ${res.status} al consultar la API`)
    }

    return res.json() as Promise<T>
}

export async function getCharacterById(id: number, signal?: AbortSignal): Promise<Character> {
    logger.info('Fetching character', { id })
    const character = await fetchJson<Character>(
        `${BASE_URL}/character/${id}`,
        'Personaje no encontrado',
        signal
    )
    logger.info('Character loaded', { id, name: character.name, episodes: character.episode.length })
    return character
}

export async function getEpisodes(episodeUrls: string[], signal?: AbortSignal): Promise<Episode[]> {
    if (episodeUrls.length === 0) return []

    const ids = episodeUrls.map((url) => url.split('/').pop()).join(',')
    logger.info('Fetching episodes', { count: episodeUrls.length })

    const data = await fetchJson<Episode | Episode[]>(
        `${BASE_URL}/episode/${ids}`,
        'No se encontraron los episodios',
        signal
    )

    return Array.isArray(data) ? data : [data]
}