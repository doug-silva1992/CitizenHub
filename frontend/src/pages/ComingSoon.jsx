import { Construction } from 'lucide-react'
import { Link } from 'react-router'

export default function ComingSoon() {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-24 text-center">
      <Construction className="size-10 text-slate-400" />
      <h1 className="mt-4 text-lg font-semibold text-slate-900">Em construção</h1>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Esta seção ainda está sendo desenvolvida. Enquanto isso, acompanhe tudo pela visão geral.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Voltar para a visão geral
      </Link>
    </div>
  )
}
