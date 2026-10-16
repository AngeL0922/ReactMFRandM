import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="shell-navbar">
      <div className="shell-container shell-navbar__inner">
        <Link to="/" className="shell-brand">
          <span className="shell-brand__dot" aria-hidden="true" />
          Rick & Morty Explorer
        </Link>
        <nav aria-label="Principal">
          <NavLink to="/" end className="shell-navlink">
            Personajes
          </NavLink>
        </nav>
      </div>
    </header>
  )
}