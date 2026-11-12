import { CalendarDays, CircleAlert, FolderOpen, Hourglass } from 'lucide-react'
import DocumentsList from '../components/dashboard/DocumentsList'
import NextSteps from '../components/dashboard/NextSteps'
import ProcessTimeline from '../components/dashboard/ProcessTimeline'
import RecentActivity from '../components/dashboard/RecentActivity'
import StatCard from '../components/dashboard/StatCard'
import { useAuth } from '../contexts/useAuth'
import { citizenships } from '../data/citizenships'
import { activities, documents, processStages, tasks } from '../data/dashboard'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0]
  const citizenship = citizenships[user?.citizenship]

  const done = processStages.filter((s) => s.status === 'done').length
  const progress = Math.round(((done + 0.5) / processStages.length) * 100)
  const current = processStages.find((s) => s.status === 'current')
  const pendingDocs = documents.filter((d) => ['pending', 'rejected'].includes(d.status)).length
  const approvedDocs = documents.filter((d) => d.status === 'approved').length

  return (
    <div className="space-y-6">
      {/* Cabeçalho + progresso */}
      <section className="overflow-hidden rounded-2xl bg-linear-to-br from-brand-700 to-brand-900 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-brand-200">
              {greeting()}, {firstName} 👋
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Sua cidadania {citizenship?.label.toLowerCase() ?? ''} está {progress}% concluída
            </h1>
            <p className="mt-2 text-sm text-brand-100/80">
              Etapa atual: <span className="font-medium text-white">{current?.title}</span>
            </p>
          </div>
          <span className="text-5xl" aria-hidden>
            {citizenship?.flag}
          </span>
        </div>

        <div className="mt-6">
          <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-brand-200">
            <span>
              {done} de {processStages.length} etapas concluídas
            </span>
            <span>Previsão: 2º semestre de 2027</span>
          </div>
        </div>
      </section>

      {/* Indicadores */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FolderOpen}
          label="Documentos aprovados"
          value={`${approvedDocs}/${documents.length}`}
          hint="1 em análise"
          tone="emerald"
        />
        <StatCard
          icon={CircleAlert}
          label="Pendências"
          value={pendingDocs}
          hint="1 documento recusado"
          tone="amber"
        />
        <StatCard
          icon={CalendarDays}
          label="Próximo agendamento"
          value="25/11"
          hint="Reunião com especialista"
          tone="violet"
        />
        <StatCard icon={Hourglass} label="Tempo estimado" value="~12 meses" hint="Via judicial" />
      </section>

      {/* Conteúdo principal */}
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <DocumentsList documents={documents} />
          <ProcessTimeline stages={processStages} />
        </div>
        <div className="space-y-6">
          <NextSteps tasks={tasks} />
          <RecentActivity activities={activities} />
        </div>
      </section>
    </div>
  )
}
