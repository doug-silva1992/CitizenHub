import { FileText, Upload } from 'lucide-react'
import Card from './Card'

const statusMap = {
  approved: { label: 'Aprovado', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  review: { label: 'Em análise', className: 'bg-sky-50 text-sky-700 ring-sky-600/20' },
  rejected: { label: 'Recusado', className: 'bg-red-50 text-red-700 ring-red-600/20' },
  pending: { label: 'Pendente', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
}

export default function DocumentsList({ documents }) {
  const approved = documents.filter((d) => d.status === 'approved').length

  return (
    <Card
      title={`Documentos (${approved}/${documents.length} aprovados)`}
      action={
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700">
          <Upload className="size-3.5" />
          Enviar documento
        </button>
      }
    >
      <ul className="-my-3 divide-y divide-slate-100">
        {documents.map((doc) => {
          const status = statusMap[doc.status]
          const needsAction = doc.status === 'pending' || doc.status === 'rejected'
          return (
            <li key={doc.id} className="flex items-center gap-3 py-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
                <FileText className="size-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">{doc.name}</p>
                <p className="truncate text-xs text-slate-500">
                  {doc.owner}
                  {doc.note && <span className="text-red-600"> · {doc.note}</span>}
                </p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${status.className}`}>
                {status.label}
              </span>
              {needsAction && (
                <button className="hidden shrink-0 text-xs font-semibold text-brand-600 hover:text-brand-700 sm:block">
                  Enviar
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
