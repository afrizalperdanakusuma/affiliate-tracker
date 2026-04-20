// src/utils/format.js

export function formatIDR(n) {
  if (n === undefined || n === null) return 'Rp0'
  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  if (abs >= 1_000_000_000) return `${sign}Rp${(abs / 1_000_000_000).toFixed(2)}M`
  if (abs >= 1_000_000)     return `${sign}Rp${(abs / 1_000_000).toFixed(1)}jt`
  return `${sign}Rp${Math.round(abs).toLocaleString('id-ID')}`
}

export function formatNumber(n) {
  return Math.round(n || 0).toLocaleString('id-ID')
}

export function formatRoas(n) {
  return n.toFixed(2) + 'x'
}

export function formatPercent(n) {
  return n.toFixed(1) + '%'
}
