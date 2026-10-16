import type { Episode } from '../types'

interface EpisodeListProps {
  episodes: Episode[]
  error?: string | null
}

export default function EpisodeList({ episodes, error }: EpisodeListProps) {
  return (
    <section className="cd-episodes" aria-labelledby="cd-episodes-title">
      <h3 id="cd-episodes-title" className="cd-episodes__title">
        Episodios <span className="cd-episodes__count">{episodes.length}</span>
      </h3>

      {error && (
        <p className="cd-episodes__error" role="alert">
          No se pudieron cargar los episodios: {error}
        </p>
      )}

      {!error && episodes.length === 0 && (
        <p className="cd-episodes__empty">Este personaje no aparece en ningún episodio.</p>
      )}

      {!error && episodes.length > 0 && (
        <ul className="cd-episodes__list">
          {episodes.map((ep) => (
            <li key={ep.id} className="cd-episode">
              <span className="cd-episode__code">{ep.episode}</span>
              <div>
                <p className="cd-episode__name">{ep.name}</p>
                <p className="cd-episode__date">{ep.air_date}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}