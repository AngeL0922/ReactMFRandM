import type { CharacterFilters, StatusFilter } from '../types'

interface FiltersProps {
  value: CharacterFilters
  onChange: (filters: CharacterFilters) => void
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: '', label: 'Todos' },
  { value: 'alive', label: 'Vivo' },
  { value: 'dead', label: 'Muerto' },
  { value: 'unknown', label: 'Desconocido' },
]

export default function Filters({ value, onChange }: FiltersProps) {
  const hasFilters = value.name || value.status || value.species

  return (
    <form className="chr-filters" onSubmit={(e) => e.preventDefault()} role="search">
      <label className="chr-field">
        <span>Nombre</span>
        <input
          type="search"
          placeholder="Ej. Rick"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
        />
      </label>

      <label className="chr-field">
        <span>Estado</span>
        <select
          value={value.status}
          onChange={(e) => onChange({ ...value, status: e.target.value as StatusFilter })}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label className="chr-field">
        <span>Especie</span>
        <input
          type="search"
          placeholder="Ej. Human"
          value={value.species}
          onChange={(e) => onChange({ ...value, species: e.target.value })}
        />
      </label>

      <button
        type="button"
        className="chr-btn chr-btn--ghost"
        onClick={() => onChange({ name: '', status: '', species: '' })}
        disabled={!hasFilters}
      >
        Limpiar
      </button>
    </form>
  )
}