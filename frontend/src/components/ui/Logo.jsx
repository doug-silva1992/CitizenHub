import { Landmark } from 'lucide-react'

export default function Logo({ light = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`grid size-9 place-items-center rounded-xl ${
          light ? 'bg-white/15 text-white ring-1 ring-white/25' : 'bg-brand-600 text-white'
        }`}
      >
        <Landmark className="size-5" strokeWidth={2.2} />
      </span>
      <span className={`text-lg font-semibold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        Citizen<span className={light ? 'text-brand-200' : 'text-brand-600'}>Hub</span>
      </span>
    </div>
  )
}
