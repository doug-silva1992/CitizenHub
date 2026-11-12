import { CircleCheck } from 'lucide-react'
import Logo from '../ui/Logo'

const highlights = [
  'Checklist de documentos personalizado para a sua linha',
  'Acompanhamento de cada etapa do processo em tempo real',
  'Atendimento com especialistas direto pelo chat',
]

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-full">
      {/* Painel institucional */}
      <aside className="relative hidden w-[45%] max-w-xl flex-col justify-between overflow-hidden bg-brand-950 p-12 text-white lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(circle at 20% 15%, rgba(96,139,250,.45), transparent 45%), radial-gradient(circle at 85% 85%, rgba(37,69,235,.55), transparent 50%)',
          }}
        />
        <Logo light className="relative" />

        <div className="relative">
          <h2 className="text-3xl leading-tight font-semibold">
            Sua cidadania europeia, <br />
            sem burocracia confusa.
          </h2>
          <p className="mt-4 max-w-md text-brand-100/80">
            Organize documentos, acompanhe prazos e tire dúvidas em um só lugar — do levantamento da
            árvore genealógica até o reconhecimento.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-brand-50">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-300" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-brand-200/60">
          © {new Date().getFullYear()} CitizenHub. Todos os direitos reservados.
        </p>
      </aside>

      {/* Formulário */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Logo className="mb-10 lg:hidden" />
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  )
}
