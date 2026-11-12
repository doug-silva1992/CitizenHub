import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useAuth } from '../../contexts/useAuth'
import ChatWidget from '../chat/ChatWidget'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-full">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />

      <div className="lg:pl-64">
        <Topbar user={user} onMenu={() => setMenuOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Outlet />
        </main>
      </div>

      <ChatWidget user={user} />
    </div>
  )
}
