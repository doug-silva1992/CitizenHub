import { CircleAlert, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import AuthLayout from '../components/auth/AuthLayout'
import Button from '../components/ui/Button'
import { FormField } from '../components/ui/FormField'
import { useAuth } from '../contexts/useAuth'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.email) er.email = 'Informe seu e-mail.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'E-mail inválido.'
    if (!form.password) er.password = 'Informe sua senha.'
    return er
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) return

    setLoading(true)
    try {
      await login({ email: form.email, password: form.password })
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Bem-vindo de volta" subtitle="Entre para acompanhar o seu processo de cidadania.">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {message && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
            <CircleAlert className="size-4.5 shrink-0" />
            {message}
          </div>
        )}

        <FormField
          label="E-mail"
          type="email"
          icon={Mail}
          placeholder="voce@email.com"
          autoComplete="email"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
        />

        <FormField
          label="Senha"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          autoComplete="current-password"
          value={form.password}
          onChange={update('password')}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={update('remember')}
              className="size-4 rounded border-slate-300 accent-brand-600"
            />
            Lembrar de mim
          </label>
          <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
            Esqueci minha senha
          </a>
        </div>

        <Button type="submit" loading={loading}>
          Entrar
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Ainda não tem conta?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
          Criar conta grátis
        </Link>
      </p>
    </AuthLayout>
  )
}
