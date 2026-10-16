export default function Footer() {
  return (
    <footer className="shell-footer">
      <div className="shell-container shell-footer__inner">
        <p>
          Datos provistos por{' '}
          <a href="https://rickandmortyapi.com" target="_blank" rel="noreferrer">
            The Rick and Morty API
          </a>
        </p>
        <p>Arquitectura de microfrontends · React + Module Federation</p>
      </div>
    </footer>
  )
}