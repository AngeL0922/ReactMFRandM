interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav className="chr-pagination" aria-label="Paginación">
      <button
        type="button"
        className="chr-btn"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        ← Anterior
      </button>
      <span>
        Página <strong>{page}</strong> de {totalPages}
      </span>
      <button
        type="button"
        className="chr-btn"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        Siguiente →
      </button>
    </nav>
  )
}