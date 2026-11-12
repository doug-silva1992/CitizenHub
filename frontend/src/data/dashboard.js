/**
 * ⚠️ MOCK: dados do processo do usuário.
 * Substituir por chamadas à API (ex.: GET /api/process, GET /api/documents).
 */

export const processStages = [
  {
    id: 1,
    title: 'Análise de elegibilidade',
    description: 'Verificação da linha de descendência e do direito à cidadania.',
    status: 'done',
    date: '12/08/2026',
  },
  {
    id: 2,
    title: 'Árvore genealógica',
    description: 'Levantamento dos ascendentes até o antenato (imigrante).',
    status: 'done',
    date: '03/09/2026',
  },
  {
    id: 3,
    title: 'Busca de certidões',
    description: 'Emissão das certidões de nascimento, casamento e óbito.',
    status: 'current',
    date: 'Em andamento',
  },
  {
    id: 4,
    title: 'Apostilamento e tradução',
    description: 'Apostila de Haia e tradução juramentada dos documentos.',
    status: 'pending',
    date: 'Previsto: jan/2027',
  },
  {
    id: 5,
    title: 'Protocolo do pedido',
    description: 'Envio do processo ao consulado ou ao tribunal.',
    status: 'pending',
    date: 'Previsto: mar/2027',
  },
  {
    id: 6,
    title: 'Reconhecimento',
    description: 'Cidadania reconhecida e emissão do passaporte.',
    status: 'pending',
    date: '—',
  },
]

export const documents = [
  { id: 1, name: 'Certidão de nascimento do antenato', owner: 'Giuseppe Rossi', status: 'approved' },
  { id: 2, name: 'Certidão de casamento do antenato', owner: 'Giuseppe Rossi', status: 'approved' },
  { id: 3, name: 'Certidão de óbito do antenato', owner: 'Giuseppe Rossi', status: 'review' },
  { id: 4, name: 'Certidão de nascimento (inteiro teor)', owner: 'Antônio Rossi', status: 'approved' },
  { id: 5, name: 'Certidão de casamento (inteiro teor)', owner: 'Antônio Rossi', status: 'rejected', note: 'Ilegível — reenviar' },
  { id: 6, name: 'Certidão de nascimento (inteiro teor)', owner: 'Você', status: 'pending' },
  { id: 7, name: 'CNN — Certidão Negativa de Naturalização', owner: 'Giuseppe Rossi', status: 'pending' },
]

export const tasks = [
  {
    id: 1,
    title: 'Reenviar certidão de casamento de Antônio',
    due: 'Até 20/11',
    type: 'urgent',
  },
  {
    id: 2,
    title: 'Reunião com especialista',
    due: '25/11 às 14:00',
    type: 'meeting',
  },
  {
    id: 3,
    title: 'Solicitar CNN no Ministério da Justiça',
    due: 'Até 05/12',
    type: 'task',
  },
]

export const activities = [
  { id: 1, text: 'Certidão de óbito de Giuseppe enviada para análise', time: 'há 2 horas' },
  { id: 2, text: 'Certidão de casamento de Antônio foi recusada', time: 'ontem' },
  { id: 3, text: 'Etapa "Árvore genealógica" concluída', time: '03/09' },
]
