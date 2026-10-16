import { useCallback, useEffect, useState } from 'react'
import { getCharacterById, getEpisodes } from '../services/characterDetailService'
import { logger } from '../utils/logger'
import type { Character, Episode } from '../types'

export function useCharacterDetail(id: number) {
    const [character, setCharacter] = useState<Character | null>(null)
    const [episodes, setEpisodes] = useState<Episode[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [episodesError, setEpisodesError] = useState<string | null>(null)
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
        if (!Number.isInteger(id) || id < 1) {
            logger.warn('Invalid character id', { id })
            setError('El identificador del personaje no es válido.')
            setLoading(false)
            return
        }

        const controller = new AbortController()

        const load = async () => {
            setLoading(true)
            setError(null)
            setEpisodesError(null)
            setCharacter(null)
            setEpisodes([])

            try {
                const data = await getCharacterById(id, controller.signal)
                setCharacter(data)

                try {
                    setEpisodes(await getEpisodes(data.episode, controller.signal))
                } catch (err) {
                    if ((err as Error).name === 'AbortError') return
                    logger.error('Episodes failed', { id, message: (err as Error).message })
                    setEpisodesError((err as Error).message)
                }
            } catch (err) {
                if ((err as Error).name === 'AbortError') return
                logger.error('useCharacterDetail failed', { id, message: (err as Error).message })
                setError((err as Error).message)
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }

        load()
        return () => controller.abort()
    }, [id, reloadKey])

    const retry = useCallback(() => setReloadKey((k) => k + 1), [])

    return { character, episodes, loading, error, episodesError, retry }
}