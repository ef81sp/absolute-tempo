export const minTempo = 40
export const maxTempo = 208
export const stepTempo = 4

const _minTempoDevidedBy4 = minTempo / stepTempo
const _maxTempoDevidedBy4 = maxTempo / stepTempo

export const generateRandomTempo = (): number => {
  return (Math.floor(Math.random() * (_maxTempoDevidedBy4 - _minTempoDevidedBy4 + 1)) + _minTempoDevidedBy4) * stepTempo
}
