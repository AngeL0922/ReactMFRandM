import { Suspense, type ReactNode } from 'react'
import ErrorBoundary from './ErrorBoundary'

interface RemoteBoundaryProps {
  name: string
  children: ReactNode
}

export default function RemoteBoundary({ name, children }: RemoteBoundaryProps) {
  return (
    <ErrorBoundary name={name}>
      <Suspense
        fallback={
          <div className="shell-loading" role="status">
            <span className="shell-spinner" aria-hidden="true" />
            Cargando {name}...
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}