import { lazy } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RemoteBoundary from '../components/RemoteBoundary'

const CharacterDetail = lazy(() => import('mf_character_detail/CharacterDetail'))

export default function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  return (
    <RemoteBoundary name="MF-CharacterDetail">
      <CharacterDetail id={Number(id)} onBack={() => navigate(-1)} />
    </RemoteBoundary>
  )
}