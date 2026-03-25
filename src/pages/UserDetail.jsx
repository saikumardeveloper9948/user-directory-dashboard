import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function DetailRow({ label, value }) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  )
}

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found')
        return res.json()
      })
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="status-message">Loading…</div>
  if (error) return <div className="status-message status-message--error">Error: {error}</div>

  return (
    <div className="page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')} aria-label="Back to directory">
          ← Back
        </button>
        <h1>{user.name}</h1>
      </header>

      <div className="detail-card">
        <section className="detail-section">
          <h2>Contact Information</h2>
          <DetailRow label="Name" value={user.name} />
          <DetailRow label="Username" value={user.username} />
          <DetailRow label="Email" value={user.email} />
          <DetailRow label="Phone" value={user.phone} />
          <DetailRow label="Website" value={user.website} />
        </section>

        <section className="detail-section">
          <h2>Address</h2>
          <DetailRow label="Street" value={user.address.street} />
          <DetailRow label="Suite" value={user.address.suite} />
          <DetailRow label="City" value={user.address.city} />
          <DetailRow label="Zipcode" value={user.address.zipcode} />
          <DetailRow label="Geo" value={`${user.address.geo.lat}, ${user.address.geo.lng}`} />
        </section>

        <section className="detail-section">
          <h2>Company</h2>
          <DetailRow label="Name" value={user.company.name} />
          <DetailRow label="Catch Phrase" value={user.company.catchPhrase} />
          <DetailRow label="BS" value={user.company.bs} />
        </section>
      </div>
    </div>
  )
}
