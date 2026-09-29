import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function DataPage({ resource, title, description, columns, renderMobileTitle }) {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadResource() {
      setLoading(true)
      setError('')

      try {
        const result = await fetchCollection(resource)

        if (!ignore) {
          setItems(result.items)
          setPagination(result.pagination)
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadResource()

    return () => {
      ignore = true
    }
  }, [resource])

  return (
    <section className="content-panel">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OctoFit tracker</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <span className="record-count">{items.length} records</span>
      </div>

      {loading && <div className="status-message">Loading {resource}...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          <div className="table-responsive data-table-wrap">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th scope="col" key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id ?? item.id ?? JSON.stringify(item)}>
                    {columns.map((column) => (
                      <td key={column.key}>{column.render(item)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobile-list">
            {items.map((item) => (
              <article className="mobile-record" key={item._id ?? item.id ?? JSON.stringify(item)}>
                <h2>{renderMobileTitle(item)}</h2>
                {columns.slice(1).map((column) => (
                  <p key={column.key}>
                    <span>{column.label}</span>
                    {column.render(item)}
                  </p>
                ))}
              </article>
            ))}
          </div>

          {items.length === 0 && <div className="status-message">No {resource} available.</div>}
          {pagination && <p className="pagination-note">Paginated response detected.</p>}
        </>
      )}
    </section>
  )
}

export default DataPage