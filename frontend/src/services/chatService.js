import { fakeDelay } from './api'

/**
 * Serviço do chat de atendimento.
 *
 * ⚠️ MOCK: respostas automáticas por palavra-chave.
 * Quando houver backend: return api('/chat/messages', { method: 'POST', body: { message } })
 */
const replies = [
  {
    keywords: ['document', 'certid', 'papel'],
    text: 'Os documentos essenciais são: certidões de nascimento, casamento e óbito da linha do antenato, todas em inteiro teor, apostiladas e traduzidas. Você acompanha o que já foi enviado no card "Documentos" ao lado.',
  },
  {
    keywords: ['prazo', 'tempo', 'demora', 'quanto tempo'],
    text: 'O prazo varia conforme a via escolhida (consular, administrativa ou judicial). Pela via judicial, a média atual fica entre 12 e 24 meses após o protocolo.',
  },
  {
    keywords: ['apostil', 'haia'],
    text: 'A apostila de Haia é feita em cartórios autorizados e valida o documento no exterior. Cada certidão brasileira da sua linha precisa ser apostilada antes da tradução.',
  },
  {
    keywords: ['tradu'],
    text: 'As traduções devem ser feitas por tradutor juramentado ou reconhecido pelo consulado. Envie as certidões já apostiladas para o tradutor.',
  },
  {
    keywords: ['valor', 'preço', 'custo', 'pagamento', 'taxa'],
    text: 'Os custos envolvem emissão de certidões, apostilamento, traduções e taxas consulares/judiciais. Posso pedir para um especialista te enviar um orçamento detalhado.',
  },
  {
    keywords: ['agend', 'consulado', 'reunião'],
    text: 'Seu próximo compromisso aparece no card "Próximos passos". Quer que eu solicite um novo horário com um especialista?',
  },
  {
    keywords: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'],
    text: 'Olá! 😊 Como posso te ajudar com o seu processo de cidadania hoje?',
  },
]

const fallback =
  'Entendi! Vou encaminhar sua dúvida para um especialista, que responde em até 1 dia útil. Enquanto isso, posso ajudar com documentos, prazos, apostilamento ou traduções.'

export async function sendMessage(message) {
  await fakeDelay(900 + Math.random() * 600)
  const normalized = message.toLowerCase()
  const match = replies.find((r) => r.keywords.some((k) => normalized.includes(k)))

  return {
    id: crypto.randomUUID(),
    from: 'agent',
    text: match ? match.text : fallback,
    created_at: new Date().toISOString(),
  }
}

export const quickQuestions = [
  'Quais documentos preciso?',
  'Quanto tempo demora?',
  'O que é a apostila de Haia?',
]
