import { CircleAlert, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import AuthLayout from '../components/auth/AuthLayout'
import Button from '../components/ui/Button'
import { FormField, SelectField } from '../components/ui/FormField'
import { useAuth } from '../contexts/useAuth'
import { citizenshipOptions } from '../data/citizenships'

const initialForm = {
  name: '',
  email: '',
  citizenship: '',
  password: '',
  password_confirmation: '',
  terms: false,
}

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
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
    if (form.name.trim().length < 3) er.name = 'Informe seu nome completo.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'E-mail inválido.'
    if (!form.citizenship) er.citizenship = 'Selecione a cidadania desejada.'
    if (form.password.length < 8) er.password = 'A senha deve ter pelo menos 8 caracteres.'
    if (form.password !== form.password_confirmation)
      er.password_confirmation = 'As senhas não conferem.'
    if (!form.terms) er.terms = 'Você precisa aceitar os termos.'
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
      await register({
        name: form.name.trim(),
        email: form.email,
        citizenship: form.citizenship,
        password: form.password,
      })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      if (err.errors) {
        setErrors(Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v[0]])))
      }
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Comece agora a organizar o seu pedido de cidadania."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {message && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
            <CircleAlert className="size-4.5 shrink-0" />
            {message}
          </div>
        )}

        <FormField
          label="Nome completo"
          icon={User}
          placeholder="Maria da Silva"
          autoComplete="name"
          value={form.name}
          onChange={update('name')}
          error={errors.name}
        />

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

        <SelectField
          label="Cidadania desejada"
          value={form.citizenship}
          onChange={update('citizenship')}
          error={errors.citizenship}
          options={[{ value: '', label: 'Selecione...', disabled: true }, ...citizenshipOptions]}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Senha"
            type="password"
            icon={Lock}
            placeholder="Mín. 8 caracteres"
            autoComplete="new-password"
            value={form.password}
            onChange={update('password')}
            error={errors.password}
          />
          <FormField
            label="Confirmar senha"
            type="password"
            icon={Lock}
            placeholder="Repita a senha"
            autoComplete="new-password"
            value={form.password_confirmation}
            onChange={update('password_confirmation')}
            error={errors.password_confirmation}
          />
        </div>

        <div>
          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={update('terms')}
              className="mt-0.5 size-4 rounded border-slate-300 accent-brand-600"
            />
            <span>
              Li e aceito os{' '}
              <a href="#" className="font-medium text-brand-600 hover:underline">
                Termos de uso
              </a>{' '}
              e a{' '}
              <a href="#" className="font-medium text-brand-600 hover:underline">
                Política de privacidade
              </a>
              .
            </span>
          </label>
          {errors.terms && <p className="mt-1.5 text-xs text-red-600">{errors.terms}</p>}
        </div>

        <Button type="submit" loading={loading}>
          Criar conta
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Já tem uma conta?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
          Entrar
        </Link>
      </p>
    </AuthLayout>
  )
}
