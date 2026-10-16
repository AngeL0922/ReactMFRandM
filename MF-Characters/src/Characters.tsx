import { useMemo, useState } from 'react'
import Filters from './components/Filters'
import CharacterCard from './components/CharacterCard'
import Pagination from './components/Pagination'
import { useCharacters } from './hooks/useCharacters'
import { useDebounce } from './hooks/useDebounce'
import type { CharacterFilters } from './types'
import './Characters.css'

export interface CharactersProps {
  onSelect: (id: number) => void
}

const INITIAL_FILTERS: CharacterFilters = { name: '', status: '', species: '' }

export default function Characters({ onSelect }: CharactersProps) {
  const [filters, setFilters] = useState<CharacterFilters>(INITIAL_FILTERS)
  const [page, setPage] = useState(1)

  const debouncedName = useDebounce(filters.name)
  const debouncedSpecies = useDebounce(filters.species)

  const appliedFilters = useMemo<CharacterFilters>(
    () => ({ name: debouncedName, status: filters.status, species: debouncedSpecies }),
    [debouncedName, filters.status, debouncedSpecies]
  )

  const { characters, totalPages, loading, error, retry } = useCharacters(page, appliedFilters)

  const handleFiltersChange = (next: CharacterFilters) => {
    setFilters(next)
    setPage(1)
  }

  const handlePageChange = (next: number) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="chr-root">
      <header className="chr-header">
        <h2>Personajes</h2>
        <p>Explora el multiverso y selecciona un personaje para ver su detalle.</p>
      </header>

      <Filters value={filters} onChange={handleFiltersChange} />

      {loading && (
        <div className="chr-state" role="status">
          <span className="chr-spinner" aria-hidden="true" />
          Cargando personajes...
        </div>
      )}

      {!loading && error && (
        <div className="chr-state chr-state--error" role="alert">
          <p>{error}</p>
          <button type="button" className="chr-btn" onClick={retry}>Reintentar</button>
        </div>
      )}

      {!loading && !error && characters.length === 0 && (
        <div className="chr-state">No se encontraron personajes con esos filtros.</div>
      )}

      {!loading && !error && characters.length > 0 && (
        <>
          <div className="chr-grid">
            {characters.map((c) => (
              <CharacterCard key={c.id} character={c} onSelect={onSelect} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        </>
      )}
    </section>
  )
}