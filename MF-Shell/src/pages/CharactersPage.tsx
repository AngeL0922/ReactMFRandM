import { lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import RemoteBoundary from '../components/RemoteBoundary'
import { logger } from '../utils/logger'

const Characters = lazy(() => import('mf_characters/Characters'))

export default function CharactersPage() {
  const navigate = useNavigate()

  const handleSelect = (id: number) => {
    logger.info('Character selected', { id })
    navigate(`/character/${id}`)
  }

  return (
    <RemoteBoundary name="MF-Characters">
      <Characters onSelect={handleSelect} />
    </RemoteBoundary>
  )
}