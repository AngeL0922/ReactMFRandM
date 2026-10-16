import { useCallback, useEffect, useState } from 'react'
import { getCharacters } from '../services/characterService'
import { logger } from '../utils/logger'
import type { Character, CharacterFilters } from '../types'

export function useCharacters(page: number, filters: CharacterFilters) {
    const [characters, setCharacters] = useState<Character[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        setError(null)

        getCharacters(page, filters, controller.signal)
            .then((data) => {
                setCharacters(data.results)
                setTotalPages(data.info.pages)
            })
            .catch((err: Error) => {
                if (err.name === 'AbortError') return
                logger.error('useCharacters failed', { page, message: err.message })
                setError(err.message)
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false)
            })

        return () => controller.abort()
    }, [page, filters, reloadKey])

    const retry = useCallback(() => setReloadKey((k) => k + 1), [])

    return { characters, totalPages, loading, error, retry }
}