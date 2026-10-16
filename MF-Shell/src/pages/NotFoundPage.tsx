import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="shell-fallback">
      <h2>404 · Página no encontrada</h2>
      <p>Estas saliendo de la cuerva infinita, cuidado.</p>
      <Link to="/" className="shell-btn">Volver al inicio</Link>
    </div>
  )
}