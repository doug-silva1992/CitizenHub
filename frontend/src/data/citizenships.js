export const citizenships = {
  italiana: { label: 'Italiana', flag: '🇮🇹', country: 'Itália' },
  portuguesa: { label: 'Portuguesa', flag: '🇵🇹', country: 'Portugal' },
  espanhola: { label: 'Espanhola', flag: '🇪🇸', country: 'Espanha' },
  alema: { label: 'Alemã', flag: '🇩🇪', country: 'Alemanha' },
  polonesa: { label: 'Polonesa', flag: '🇵🇱', country: 'Polônia' },
}

export const citizenshipOptions = Object.entries(citizenships).map(([value, c]) => ({
  value,
  label: `${c.flag}  ${c.label}`,
}))
