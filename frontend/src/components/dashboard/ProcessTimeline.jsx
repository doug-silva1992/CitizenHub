import { Check } from 'lucide-react'
import Card from './Card'

export default function ProcessTimeline({ stages }) {
  return (
    <Card title="Etapas do processo">
      <ol className="relative">
        {stages.map((stage, i) => {
          const last = i === stages.length - 1
          return (
            <li key={stage.id} className="relative flex gap-4 pb-6 last:pb-0">
              {!last && (
                <span
                  aria-hidden
                  className={`absolute top-8 left-3.75 h-[calc(100%-2rem)] w-0.5 ${
                    stage.status === 'done' ? 'bg-brand-500' : 'bg-slate-200'
                  }`}
                />
              )}

              <span
                className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                  stage.status === 'done'
                    ? 'bg-brand-600 text-white'
                    : stage.status === 'current'
                      ? 'bg-white text-brand-600 ring-2 ring-brand-500'
                      : 'bg-slate-100 text-slate-400'
                }`}
              >
                {stage.status === 'done' ? <Check className="size-4" strokeWidth={3} /> : stage.id}
              </span>

              <div className="min-w-0 flex-1 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <p
                    className={`text-sm font-semibold ${
                      stage.status === 'pending' ? 'text-slate-500' : 'text-slate-900'
                    }`}
                  >
                    {stage.title}
                    {stage.status === 'current' && (
                      <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                        Etapa atual
                      </span>
                    )}
                  </p>
                  <span className="text-xs text-slate-400">{stage.date}</span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500">{stage.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </Card>
  )
}
