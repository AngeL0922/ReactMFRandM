import type { Character } from '../types'

interface CharacterCardProps {
  character: Character
  onSelect: (id: number) => void
}

export default function CharacterCard({ character, onSelect }: CharacterCardProps) {
  const statusClass = `chr-status chr-status--${character.status.toLowerCase()}`

  return (
    <button
      type="button"
      className="chr-card"
      onClick={() => onSelect(character.id)}
      aria-label={`Ver detalle de ${character.name}`}
    >
      <img className="chr-card__img" src={character.image} alt={character.name} loading="lazy" />
      <div className="chr-card__body">
        <h3 className="chr-card__name">{character.name}</h3>
        <span className={statusClass}>{character.status}</span>
        <dl className="chr-card__meta">
          <div>
            <dt>Especie</dt>
            <dd>{character.species}</dd>
          </div>
          <div>
            <dt>Género</dt>
            <dd>{character.gender}</dd>
          </div>
        </dl>
      </div>
    </button>
  )
}