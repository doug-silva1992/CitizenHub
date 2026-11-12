import Card from './Card'

export default function RecentActivity({ activities }) {
  return (
    <Card title="Atividade recente">
      <ul className="space-y-4">
        {activities.map((a) => (
          <li key={a.id} className="flex gap-3">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-400" />
            <div>
              <p className="text-sm text-slate-700">{a.text}</p>
              <p className="text-xs text-slate-400">{a.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
