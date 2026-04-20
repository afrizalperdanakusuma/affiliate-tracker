// src/pages/Campaigns.jsx
import { useState } from 'react'
import { formatIDR, formatNumber, formatRoas } from '../utils/format'
import { Icons } from '../components/Icons'

export default function Campaigns({ byCampaign, adsData, affiliateData }) {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('profit')

  if (adsData.length === 0 && affiliateData.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><Icons.Grid /></div>
        <h3>Belum ada data kampanye</h3>
        <p>Import data terlebih dahulu di menu Import CSV</p>
      </div>
    )
  }

  const rows = byCampaign
    .filter(r => r.campaign.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'profit')     return b.profit - a.profit
      if (sortBy === 'roas')       return b.roas - a.roas
      if (sortBy === 'spend')      return b.spend - a.spend
      if (sortBy === 'commission') return b.commission - a.commission
      return b.orders - a.orders
    })

  const statusLabel = (r) => {
    if (r.profit >= 0 && r.roas >= 2) return { label: 'Scale ↑', cls: 'badge-green' }
    if (r.profit >= 0)                return { label: 'Untung',   cls: 'badge-green' }
    if (r.roas >= 0.7)                return { label: 'Review',   cls: 'badge-neutral' }
    return { label: 'Kill ✕', cls: 'badge-red' }
  }

  return (
    <div>
      <div className="filter-bar">
        <input
          placeholder="Cari nama kampanye..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="profit">Sort: Profit</option>
          <option value="roas">Sort: ROAS</option>
          <option value="spend">Sort: Spend</option>
          <option value="commission">Sort: Komisi</option>
          <option value="orders">Sort: Pesanan</option>
        </select>
      </div>

      {rows.length === 0 ? (
        <div className="empty-state" style={{ padding: '2rem' }}>
          <p>Tidak ada kampanye yang cocok dengan pencarian.</p>
        </div>
      ) : (
        <div className="panel" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Kampanye</th>
                  <th className="td-num">Spend</th>
                  <th className="td-num">Komisi</th>
                  <th className="td-num">Profit</th>
                  <th className="td-num">ROAS</th>
                  <th className="td-num">Pesanan</th>
                  <th className="td-num">CPO</th>
                  <th className="td-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => {
                  const { label, cls } = statusLabel(r)
                  return (
                    <tr key={r.campaign}>
                      <td className="td-camp">{r.campaign}</td>
                      <td className="td-num td-muted">{formatIDR(r.spend)}</td>
                      <td className="td-num">{formatIDR(r.commission)}</td>
                      <td className={`td-num td-profit ${r.profit >= 0 ? 'up' : 'down'}`}>{formatIDR(r.profit)}</td>
                      <td className="td-num">
                        <span className={`roas-pill ${r.roas >= 1 ? 'up' : 'down'}`}>{formatRoas(r.roas)}</span>
                      </td>
                      <td className="td-num td-muted">{formatNumber(r.orders)}</td>
                      <td className="td-num td-muted">{r.cpo > 0 ? formatIDR(r.cpo) : '—'}</td>
                      <td className="td-center">
                        <span className={`badge ${cls}`}>{label}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
