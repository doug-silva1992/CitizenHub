import {
  CalendarDays,
  CircleHelp,
  CreditCard,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Network,
  Scale,
  Settings,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router'
import Logo from '../ui/Logo'

const mainNav = [
  { to: '/dashboard', label: 'Visão geral', icon: LayoutDashboard },
  { to: '/dashboard/processo', label: 'Meu processo', icon: Scale },
  { to: '/dashboard/documentos', label: 'Documentos', icon: FolderOpen, badge: 3 },
  { to: '/dashboard/arvore', label: 'Árvore genealógica', icon: Network },
  { to: '/dashboard/agenda', label: 'Agendamentos', icon: CalendarDays },
  { to: '/dashboard/pagamentos', label: 'Pagamentos', icon: CreditCard },
]

const bottomNav = [
  { to: '/dashboard/ajuda', label: 'Central de ajuda', icon: CircleHelp },
  { to: '/dashboard/configuracoes', label: 'Configurações', icon: Settings },
]

function NavItem({ to, label, icon: Icon, badge, onNavigate }) {
  return (
    <NavLink
      to={to}
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
          isActive
            ? 'bg-brand-50 text-brand-700'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`
      }
    >
      <Icon className="size-4.5 shrink-0" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
          {badge}
        </span>
      )}
    </NavLink>
  )
}

export default function Sidebar({ open, onClose, onLogout }) {
  return (
    <>
      {/* Overlay mobile */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-slate-900/40 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo />
          <button onClick={onClose} className="rounded p-1 text-slate-400 hover:text-slate-600 lg:hidden" aria-label="Fechar menu">
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">Menu</p>
          {mainNav.map((item) => (
            <NavItem key={item.to} {...item} onNavigate={onClose} />
          ))}

          <div className="mt-auto space-y-1 border-t border-slate-100 pt-4">
            {bottomNav.map((item) => (
              <NavItem key={item.to} {...item} onNavigate={onClose} />
            ))}
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="size-4.5" />
              Sair
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}
