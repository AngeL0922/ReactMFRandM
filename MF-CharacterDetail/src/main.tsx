import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CharacterDetail from './CharacterDetail'
import './index.css'

const id = Number(new URLSearchParams(window.location.search).get('id') ?? 1)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CharacterDetail id={id} onBack={() => console.log('Volver al listado')} />
  </StrictMode>
)