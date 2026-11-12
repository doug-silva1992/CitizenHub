import { CalendarDays, CircleAlert, ClipboardList } from 'lucide-react'
import Card from './Card'

const typeMap = {
  urgent: { icon: CircleAlert, className: 'bg-red-50 text-red-600' },
  meeting: { icon: CalendarDays, className: 'bg-violet-50 text-violet-600' },
  task: { icon: ClipboardList, className: 'bg-slate-100 text-slate-600' },
}

export default function NextSteps({ tasks }) {
  return (
    <Card title="Próximos passos">
      <ul className="space-y-4">
        {tasks.map((task) => {
          const { icon: Icon, className } = typeMap[task.type]
          return (
            <li key={task.id} className="flex items-start gap-3">
              <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${className}`}>
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900">{task.title}</p>
                <p className="text-xs text-slate-500">{task.due}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
