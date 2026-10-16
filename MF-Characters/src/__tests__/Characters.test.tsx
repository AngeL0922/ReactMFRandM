import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Characters from '../Characters'
import { getCharacters } from '../services/characterService'

vi.mock('../services/characterService')

describe('Characters', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('muestra las tarjetas cuando la API responde', async () => {
    vi.mocked(getCharacters).mockResolvedValue({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', image: 'rick.png' },
      ],
    })

    render(<Characters onSelect={() => {}} />)

    expect(screen.getByText(/Cargando personajes/)).toBeInTheDocument()
    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument()
  })

  it('muestra el error y el botón de reintentar cuando la API falla', async () => {
    vi.mocked(getCharacters).mockRejectedValue(new Error('Error 500 al cargar personajes'))

    render(<Characters onSelect={() => {}} />)

    expect(await screen.findByText('Error 500 al cargar personajes')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument()
  })
})