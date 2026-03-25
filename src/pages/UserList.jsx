import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function SortIcon({ field, sortField, sortDirection }) {
  if (sortField !== field) return <span className="sort-icon sort-icon--inactive">⇅</span>
  return (
    <span className="sort-icon sort-icon--active">
      {sortDirection === 'asc' ? '↑' : '↓'}
    </span>
  )
}

export default function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const navigate = useNavigate()

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users')
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredAndSorted = useMemo(() => {
    const query = search.toLowerCase()
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
    )
    return [...filtered].sort((a, b) => {
      const valA = sortField === 'name' ? a.name : a.company.name
      const valB = sortField === 'name' ? b.name : b.company.name
      const cmp = valA.localeCompare(valB)
      return sortDirection === 'asc' ? cmp : -cmp
    })
  }, [users, search, sortField, sortDirection])

  if (loading) return <div className="status-message">Loading users…</div>
  if (error) return <div className="status-message status-message--error">Error: {error}</div>

  return (
    <div className="page">
      <header className="page-header">
        <h1>User Directory</h1>
        <input
          className="search-input"
          type="search"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search users"
        />
      </header>

      {filteredAndSorted.length === 0 ? (
        <p className="status-message">No users match your search.</p>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th
                  className="sortable"
                  onClick={() => handleSort('name')}
                  aria-sort={sortField === 'name' ? sortDirection : 'none'}
                >
                  Name <SortIcon field="name" sortField={sortField} sortDirection={sortDirection} />
                </th>
                <th>Email</th>
                <th>Phone</th>
                <th
                  className="sortable"
                  onClick={() => handleSort('company')}
                  aria-sort={sortField === 'company' ? sortDirection : 'none'}
                >
                  Company <SortIcon field="company" sortField={sortField} sortDirection={sortDirection} />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((user) => (
                <tr
                  key={user.id}
                  className="user-row"
                  onClick={() => navigate(`/users/${user.id}`)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/users/${user.id}`)}
                  role="button"
                  aria-label={`View details for ${user.name}`}
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
