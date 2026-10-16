import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EpisodeList from '../components/EpisodeList'
import type { Episode } from '../types'

const episodes: Episode[] = [
  { id: 1, name: 'Pilot', air_date: 'December 2, 2013', episode: 'S01E01' },
  { id: 2, name: 'Lawnmower Dog', air_date: 'December 9, 2013', episode: 'S01E02' },
]

describe('EpisodeList', () => {
  it('muestra cada episodio con su código, nombre y fecha', () => {
    render(<EpisodeList episodes={episodes} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('S01E01')).toBeInTheDocument()
    expect(screen.getByText('Pilot')).toBeInTheDocument()
    expect(screen.getByText('December 9, 2013')).toBeInTheDocument()
  })

  it('muestra un aviso cuando falla la carga de episodios', () => {
    render(<EpisodeList episodes={[]} error="Error 500 al consultar la API" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Error 500 al consultar la API')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})