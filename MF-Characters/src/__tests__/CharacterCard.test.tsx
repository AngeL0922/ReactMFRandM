import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterCard from '../components/CharacterCard'
import type { Character } from '../types'

const rick: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
}

describe('CharacterCard', () => {
  it('muestra imagen, nombre, estado, especie y género', () => {
    render(<CharacterCard character={rick} onSelect={() => {}} />)

    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toBeInTheDocument()
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByText('Male')).toBeInTheDocument()
  })

  it('llama a onSelect con el id al hacer clic', async () => {
    const onSelect = vi.fn()
    render(<CharacterCard character={rick} onSelect={onSelect} />)

    await userEvent.click(screen.getByRole('button', { name: /Rick Sanchez/ }))

    expect(onSelect).toHaveBeenCalledWith(1)
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})