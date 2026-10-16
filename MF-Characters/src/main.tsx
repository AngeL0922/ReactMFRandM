import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Characters from './Characters'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Characters onSelect={(id) => console.log('Personaje seleccionado:', id)} />
  </StrictMode>
)