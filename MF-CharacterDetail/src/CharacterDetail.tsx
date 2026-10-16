import CharacterInfo from './components/CharacterInfo'
import EpisodeList from './components/EpisodeList'
import { useCharacterDetail } from './hooks/useCharacterDetail'
import './CharacterDetail.css'

export interface CharacterDetailProps {
  id: number
  onBack?: () => void
}

export default function CharacterDetail({ id, onBack }: CharacterDetailProps) {
  const { character, episodes, loading, error, episodesError, retry } = useCharacterDetail(id)

  return (
    <section className="cd-root">
      {onBack && (
        <button type="button" className="cd-btn cd-btn--ghost cd-back" onClick={onBack}>
          ← Volver al listado
        </button>
      )}

      {loading && (
        <div className="cd-state" role="status">
          <span className="cd-spinner" aria-hidden="true" />
          Cargando personaje...
        </div>
      )}

      {!loading && error && (
        <div className="cd-state cd-state--error" role="alert">
          <p>{error}</p>
          <button type="button" className="cd-btn" onClick={retry}>Reintentar</button>
        </div>
      )}

      {!loading && !error && character && (
        <div className="cd-layout">
          <CharacterInfo character={character} />
          <EpisodeList episodes={episodes} error={episodesError} />
        </div>
      )}
    </section>
  )
}