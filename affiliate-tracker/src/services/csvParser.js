// src/utils/csvParser.js
// Smart CSV parser for Meta Ads and Shopee Affiliate exports
// Uses PapaParse + flexible column detection

import Papa from 'papaparse'
import { makeRecordId } from './db'

// ── Date normalizer ──────────────────────────────────────────────
export function parseDate(raw) {
  if (!raw) return null
  const s = String(raw).trim()

  // YYYY-MM-DD
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (m) return `${m[1]}-${m[2]}-${m[3]}`

  // DD/MM/YYYY or DD-MM-YYYY
  m = s.match(/^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/)
  if (m) return `${m[3]}-${m[2]}-${m[1]}`

  // DD MMM YYYY (e.g. 01 Jan 2024)
  const months = { jan:1,feb:2,mar:3,apr:4,mei:5,may:5,jun:6,jul:7,agt:8,aug:8,sep:9,okt:10,oct:10,nov:11,des:12,dec:12 }
  m = s.match(/^(\d{1,2})\s+([a-zA-Z]{3})\s+(\d{4})$/)
  if (m) {
    const mo = months[m[2].toLowerCase()]
    if (mo) return `${m[3]}-${String(mo).padStart(2,'0')}-${String(m[1]).padStart(2,'0')}`
  }

  // Fallback: native Date parse
  const d = new Date(s)
  if (!isNaN(d)) return d.toISOString().split('T')[0]
  return null
}

// ── Number cleaner (handles IDR format: 1.234.567 or 1,234,567) ──
export function parseNumber(raw) {
  if (raw === undefined || raw === null || raw === '' || raw === '-') return 0
  const s = String(raw)
    .replace(/[Rp\s]/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '.')
  const n = parseFloat(s.replace(/[^\d.-]/g, ''))
  return isNaN(n) ? 0 : n
}

// ── Flexible column key finder ───────────────────────────────────
function findKey(headers, patterns) {
  return headers.find(h =>
    patterns.some(p => h.toLowerCase().includes(p.toLowerCase()))
  )
}

// ── Parse Meta Ads CSV ───────────────────────────────────────────
export function parseMetaAds(rows, logFn) {
  const headers = Object.keys(rows[0] || {})

  const dateKey      = findKey(headers, ['tanggal mulai','tanggal', 'date', 'hari', 'day'])
  const campaignKey  = findKey(headers, ['nama kampanye', 'campaign name', 'campaign', 'kampanye'])
  const spendKey     = findKey(headers, ['jumlah yang dibelanjakan', 'amount spent', 'spend', 'pengeluaran', 'biaya'])
  const impressKey   = findKey(headers, ['tayangan', 'impressions', 'impresi'])
  const clickKey     = findKey(headers, ['klik (semua)', 'klik', 'clicks', 'click'])
  const resultKey    = findKey(headers, ['hasil', 'results', 'konversi'])
  const reachKey     = findKey(headers, ['jangkauan', 'reach'])
  const freqKey      = findKey(headers, ['frekuensi', 'frequency'])

  logFn(`Kolom terdeteksi → tanggal: "${dateKey}", kampanye: "${campaignKey}", spend: "${spendKey}"`)

  const records = []
  let skipped = 0

  for (const row of rows) {
    const date = parseDate(row[dateKey])
    const campaign = (row[campaignKey] || '').trim()

    if (!date || !campaign) { skipped++; continue }

    records.push({
      id:          makeRecordId(date, campaign),
      date,
      campaign,
      spend:       parseNumber(row[spendKey]),
      impressions: parseNumber(row[impressKey]),
      clicks:      parseNumber(row[clickKey]),
      results:     parseNumber(row[resultKey]),
      reach:       parseNumber(row[reachKey]),
      frequency:   parseNumber(row[freqKey]),
      source:      'meta',
      importedAt:  new Date().toISOString(),
    })
  }

  logFn(`Berhasil parse ${records.length} baris${skipped > 0 ? `, ${skipped} baris dilewati (tidak ada tanggal/kampanye)` : ''}`)
  return records
}

// ── Parse Shopee Affiliate CSV ───────────────────────────────────
export function parseShopeeAffiliate(rows, logFn) {
  const headers = Object.keys(rows[0] || {})

  const dateKey       = findKey(headers, ['tanggal', 'date', 'hari', 'day'])
  const campaignKey   = findKey(headers, ['nama kampanye', 'campaign name', 'campaign', 'kampanye', 'nama'])
  const commissionKey = findKey(headers, ['komisi kotor', 'total komisi per pesanan', 'komisi', 'commission', 'pendapatan'])
  const ordersKey     = findKey(headers, ['pesanan terkonfirmasi', 'pesanan', 'orders', 'order', 'jumlah pesanan'])
  const clickKey      = findKey(headers, ['klik', 'clicks', 'click'])
  const soldKey       = findKey(headers, ['produk terjual', 'items sold', 'terjual', 'item'])
  const convKey       = findKey(headers, ['konversi', 'conversion rate', 'cr'])

  logFn(`Kolom terdeteksi → tanggal: "${dateKey}", kampanye: "${campaignKey}", komisi: "${commissionKey}"`)

  const records = []
  let skipped = 0

  for (const row of rows) {
    const date = parseDate(row[dateKey])
    const campaign = (row[campaignKey] || '').trim()

    if (!date || !campaign) { skipped++; continue }

    records.push({
      id:           makeRecordId(date, campaign),
      date,
      campaign,
      commission:   parseNumber(row[commissionKey]),
      orders:       parseNumber(row[ordersKey]),
      clicks:       parseNumber(row[clickKey]),
      itemsSold:    parseNumber(row[soldKey]),
      convRate:     parseNumber(row[convKey]),
      source:       'shopee',
      importedAt:   new Date().toISOString(),
    })
  }

  logFn(`Berhasil parse ${records.length} baris${skipped > 0 ? `, ${skipped} baris dilewati` : ''}`)
  return records
}

// ── Main CSV file processor ──────────────────────────────────────
export function processCSVFile(file, type) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (result) => {
        if (!result.data || result.data.length === 0) {
          reject(new Error('File CSV kosong atau format tidak didukung'))
          return
        }
        resolve(result.data)
      },
      error: (err) => reject(new Error(`Gagal membaca CSV: ${err.message}`)),
    })
  })
}
