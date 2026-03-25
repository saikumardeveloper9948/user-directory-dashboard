import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TiAdjustBrightness, TiAdjustContrast } from 'react-icons/ti'
import { useTheme } from '../context/useTheme'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function DetailRow({ label, value }) {
  return (
    <div className="flex gap-2 py-2 text-sm border-b border-dashed border-gray-200 dark:border-gray-700">
      <span className="font-semibold text-blue-600 dark:text-blue-400 min-w-max flex-shrink-0">{label}</span>
      <span className="text-gray-700 dark:text-gray-300 break-words">{value}</span>
    </div>
  )
}

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDarkMode, toggleTheme } = useTheme()
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

  if (loading) return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading…</div>
  if (error) return <div className="text-center py-12 text-red-600 dark:text-red-400">Error: {error}</div>

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'dark-mode dark bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-space-between gap-4">
            <button className="inline-flex items-center gap-1 px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm cursor-pointer hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-700 hover:border-blue-500 transition-all" onClick={() => navigate('/')} aria-label="Back to directory">
              ← Back
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent flex-1">
              {user.name}
            </h1>
            <button className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 hover:border-blue-500 hover:shadow-lg dark:from-gray-700 dark:to-gray-800 dark:border-gray-600 dark:hover:border-blue-400 px-3 py-2 rounded-lg text-xl cursor-pointer transition-all text-blue-600 dark:text-gray-200 flex items-center justify-center" onClick={toggleTheme} aria-label="Toggle dark mode">
              {isDarkMode ? <TiAdjustBrightness /> : <TiAdjustContrast />}
            </button>
          </div>
        </header>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <section className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-5 shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-base font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-3 pb-2 border-b-2 border-blue-100 dark:border-gray-700 uppercase tracking-widest">Contact Information</h2>
          <DetailRow label="Name" value={user.name} />
          <DetailRow label="Username" value={user.username} />
          <DetailRow label="Email" value={user.email} />
          <DetailRow label="Phone" value={user.phone} />
          <DetailRow label="Website" value={user.website} />
        </section>

        <section className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-5 shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-3 pb-2 border-b-2 border-blue-100 dark:border-gray-700 uppercase tracking-widest">Address</h2>
          <DetailRow label="Street" value={user.address.street} />
          <DetailRow label="Suite" value={user.address.suite} />
          <DetailRow label="City" value={user.address.city} />
          <DetailRow label="Zipcode" value={user.address.zipcode} />
          <DetailRow label="Geo" value={`${user.address.geo.lat}, ${user.address.geo.lng}`} />
        </section>

        <section className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-5 shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-3 pb-2 border-b-2 border-blue-100 dark:border-gray-700 uppercase tracking-widest">Company</h2>
          <DetailRow label="Name" value={user.company.name} />
          <DetailRow label="Catch Phrase" value={user.company.catchPhrase} />
          <DetailRow label="BS" value={user.company.bs} />
        </section>
        </div>
      </div>
    </div>
  )
}
