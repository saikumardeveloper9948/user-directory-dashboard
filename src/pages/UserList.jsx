import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import { TiAdjustBrightness, TiAdjustContrast } from 'react-icons/ti'
import { useTheme } from '../context/useTheme'
import { HighlightedText } from '../components/HighlightedText'

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
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const navigate = useNavigate()
  const { isDarkMode, toggleTheme } = useTheme()

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

    const fieldLabel = field === 'name' ? 'Name' : 'Company'
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc'
    const directionLabel = newDirection === 'asc' ? 'Ascending' : 'Descending'

    setAlertMessage(`Sorted by ${fieldLabel} (${directionLabel} order)`)
    setShowAlert(true)
  }

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showAlert])

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

  if (loading) return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading users…</div>
  if (error) return <div className="text-center py-12 text-red-600 dark:text-red-400">Error: {error}</div>

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'dark-mode dark bg-gray-900' : 'bg-white'}`}>
      {showAlert && (
        <Alert severity="success" className="sort-alert">
          {alertMessage}
        </Alert>
      )}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="flex flex-col items-center gap-6 mb-8">
          <div className="flex items-center justify-between w-full ">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">User Directory</h1>
            <button className="bg-gradient-to-br from-indigo-50 to-emerald-50 border-2 border-indigo-300 hover:border-emerald-400 hover:shadow-lg dark:from-gray-700 dark:to-gray-800 dark:border-gray-600 dark:hover:border-blue-400 px-3 py-2 rounded-lg text-xl cursor-pointer transition-all text-indigo-600 dark:text-gray-200 flex items-center justify-center" onClick={toggleTheme} aria-label="Toggle dark mode">
              {isDarkMode ? <TiAdjustBrightness /> : <TiAdjustContrast />}
            </button>
          </div>
          <input
            className="w-full max-w-md px-5 py-3 border-2 border-gray-300 dark:border-blue-500 rounded-xl text-sm outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-300 dark:focus:border-blue-400 dark:focus:shadow-blue-800 placeholder:text-gray-400 dark:placeholder:text-gray-300 font-medium"
            type="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search users"
          />
        </header>

        {filteredAndSorted.length === 0 ? (
          <p className="text-center py-12 text-gray-600 dark:text-gray-300 font-medium text-lg">No users match your search.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg dark:shadow-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            <table className="w-full border-collapse bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  <th
                    className="sortable px-4 py-3 text-left font-semibold text-sm tracking-wider text-white whitespace-nowrap user-select-none cursor-pointer bg-blue-600 dark:from-blue-700 dark:to-blue-800 hover:bg-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all"
                  onClick={() => handleSort('name')}
                  aria-sort={sortField === 'name' ? sortDirection : 'none'}
                >
                  Name <SortIcon field="name" sortField={sortField} sortDirection={sortDirection} />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-sm tracking-wider text-white whitespace-nowrap bg-blue-600 dark:from-blue-700 dark:to-blue-800">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-sm tracking-wider text-white whitespace-nowrap bg-blue-600 dark:from-blue-700 dark:to-blue-800">Phone</th>
                <th
                  className="px-4 py-3 text-left font-semibold text-sm tracking-wider text-white whitespace-nowrap user-select-none cursor-pointer bg-blue-600 dark:from-blue-700 dark:to-blue-800 hover:bg-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all sortable"
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
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gradient-to-r dark:hover:from-blue-900 dark:hover:to-blue-800 transition-colors border-b border-gray-200 dark:border-gray-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-(-2px) focus-visible:outline-blue-500 group"
                  onClick={() => navigate(`/users/${user.id}`)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/users/${user.id}`)}
                  role="button"
                  aria-label={`View details for ${user.name}`}
                >
                  <td className="px-4 py-3 text-sm border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-medium">
                    <HighlightedText text={user.name} searchTerm={search} />
                  </td>
                  <td className="px-4 py-3 text-sm border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    <HighlightedText text={user.email} searchTerm={search} />
                  </td>
                  <td className="px-4 py-3 text-sm border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{user.phone}</td>
                  <td className="px-4 py-3 text-sm border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{user.company.name}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
