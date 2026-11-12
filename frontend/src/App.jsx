import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { GuestRoute, ProtectedRoute } from './components/auth/RouteGuards'
import DashboardLayout from './components/layout/DashboardLayout'
import { AuthProvider } from './contexts/AuthContext'
import ComingSoon from './pages/ComingSoon'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="*" element={<ComingSoon />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
