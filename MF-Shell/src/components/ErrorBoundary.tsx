import { Component, type ErrorInfo, type ReactNode } from 'react'
import { logger } from '../utils/logger'

interface ErrorBoundaryProps {
  name: string
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error('Remote failed to render', {
      remote: this.props.name,
      message: error.message,
      componentStack: info.componentStack,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="shell-fallback" role="alert">
          <h2>Este módulo no está disponible</h2>
          <p>No pudimos cargar <strong>{this.props.name}</strong>. Intenta de nuevo en unos momentos.</p>
          <button type="button" className="shell-btn" onClick={() => window.location.reload()}>
            Recargar página
          </button>
        </div>
      )
    }
    return this.props.children
  }
}