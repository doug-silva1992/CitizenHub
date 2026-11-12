import { Bot, MessageCircle, Minus, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { quickQuestions, sendMessage } from '../../services/chatService'

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

function welcomeMessage(user) {
  const name = user?.name?.split(' ')[0] ?? ''
  return {
    id: 'welcome',
    from: 'agent',
    text: `Olá${name ? `, ${name}` : ''}! Sou a assistente do CitizenHub. Posso tirar dúvidas sobre documentos, prazos, apostilamento e traduções do seu processo.`,
    created_at: new Date().toISOString(),
  }
}

export default function ChatWidget({ user }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => [welcomeMessage(user)])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(1)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const toggle = () => {
    setOpen((o) => !o)
    setUnread(0)
  }

  const send = async (text) => {
    const content = text.trim()
    if (!content || typing) return

    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), from: 'user', text: content, created_at: new Date().toISOString() },
    ])
    setInput('')
    setTyping(true)

    try {
      const reply = await sendMessage(content)
      setMessages((m) => [...m, reply])
      if (!open) setUnread((n) => n + 1)
    } finally {
      setTyping(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    send(input)
  }

  const onlyWelcome = messages.length === 1

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div
          role="dialog"
          aria-label="Chat de atendimento"
          className="animate-chat-in flex h-[min(560px,calc(100vh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-96"
        >
          {/* Cabeçalho */}
          <header className="flex items-center gap-3 bg-brand-700 px-4 py-3 text-white">
            <span className="relative grid size-9 place-items-center rounded-full bg-white/15">
              <Bot className="size-5" />
              <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-emerald-400 ring-2 ring-brand-700" />
            </span>
            <div className="flex-1 leading-tight">
              <p className="text-sm font-semibold">Atendimento CitizenHub</p>
              <p className="text-xs text-brand-200">Online · responde em minutos</p>
            </div>
            <button onClick={toggle} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Minimizar chat">
              <Minus className="size-5" />
            </button>
          </header>

          {/* Mensagens */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((msg) => {
              const mine = msg.from === 'user'
              return (
                <div key={msg.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm shadow-xs ${
                      mine
                        ? 'rounded-br-md bg-brand-600 text-white'
                        : 'rounded-bl-md border border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className={`mt-1 text-right text-[10px] ${mine ? 'text-brand-200' : 'text-slate-400'}`}>
                      {formatTime(msg.created_at)}
                    </p>
                  </div>
                </div>
              )
            })}

            {typing && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="size-1.5 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {onlyWelcome && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Entrada */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="grid size-9 place-items-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700 disabled:opacity-40"
              aria-label="Enviar mensagem"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}

      {/* Botão flutuante */}
      <button
        onClick={toggle}
        className="relative grid size-14 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition hover:scale-105 hover:bg-brand-700"
        aria-label={open ? 'Fechar chat' : 'Abrir chat'}
      >
        {open ? <Minus className="size-6" /> : <MessageCircle className="size-6" />}
        {!open && unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-red-500 text-[11px] font-bold ring-2 ring-white">
            {unread}
          </span>
        )}
      </button>
    </div>
  )
}
