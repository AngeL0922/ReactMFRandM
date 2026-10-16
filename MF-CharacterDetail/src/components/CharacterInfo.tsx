import type { Character } from '../types'

interface CharacterInfoProps {
  character: Character
}

export default function CharacterInfo({ character }: CharacterInfoProps) {
  const statusClass = `cd-status cd-status--${character.status.toLowerCase()}`

  const details = [
    { label: 'Especie', value: character.species },
    { label: 'Tipo', value: character.type || 'N/A' },
    { label: 'Género', value: character.gender },
    { label: 'Origen', value: character.origin.name },
    { label: 'Última ubicación', value: character.location.name },
    { label: 'Apariciones', value: `${character.episode.length} episodio(s)` },
  ]

  return (
    <article className="cd-info">
      <img className="cd-info__img" src={character.image} alt={character.name} />
      <div className="cd-info__body">
        <h2 className="cd-info__name">{character.name}</h2>
        <span className={statusClass}>{character.status}</span>
        <dl className="cd-info__list">
          {details.map((d) => (
            <div key={d.label} className="cd-info__item">
              <dt>{d.label}</dt>
              <dd>{d.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}