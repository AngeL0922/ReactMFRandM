import { describe, it, expect, vi, afterEach } from 'vitest'
import { getEpisodes } from '../services/characterDetailService'

function mockFetch(body: unknown, status = 200) {
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
            ok: status >= 200 && status < 300,
            status,
            json: async () => body,
        })
    )
}

describe('getEpisodes', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('devuelve un arreglo aunque la API responda un solo objeto', async () => {
        mockFetch({ id: 1, name: 'Pilot', air_date: 'December 2, 2013', episode: 'S01E01' })

        const result = await getEpisodes(['https://rickandmortyapi.com/api/episode/1'])

        expect(Array.isArray(result)).toBe(true)
        expect(result).toHaveLength(1)
    })

    it('hace una sola petición con todos los ids separados por coma', async () => {
        mockFetch([])

        await getEpisodes([
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            'https://rickandmortyapi.com/api/episode/28',
        ])

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/episode/1,2,28', { signal: undefined })
    })

    it('no llama a la API si no hay episodios', async () => {
        mockFetch([])

        const result = await getEpisodes([])

        expect(result).toEqual([])
        expect(fetch).not.toHaveBeenCalled()
    })
})