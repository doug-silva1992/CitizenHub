import { LoaderCircle } from 'lucide-react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../../contexts/useAuth'

function FullScreenLoader() {
  return (
    <div className="grid min-h-full place-items-center">
      <LoaderCircle className="size-8 animate-spin text-brand-600" />
    </div>
  )
}

/** Só permite acesso a usuários autenticados. */
export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullScreenLoader />
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}

/** Redireciona usuários já autenticados para o dashboard (login/registro). */
export function GuestRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <FullScreenLoader />
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <Outlet />
}
