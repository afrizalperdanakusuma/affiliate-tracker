// src/pages/DataRaw.jsx
import { useState } from 'react'
import { formatIDR, formatNumber } from '../utils/format'
import { Icons } from '../components/Icons'

const MAX_ROWS = 200

export default function DataRaw({ adsData, affiliateData }) {
  const [view, setView] = useState('ads')
  const data = view === 'ads' ? adsData : affiliateData

  return (
    <div>
      <div className="tab-bar">
        <button className={`tab-btn ${view === 'ads' ? 'active' : ''}`} onClick={() => setView('ads')}>
          Meta Ads ({adsData.length})
        </button>
        <button className={`tab-btn ${view === 'affiliate' ? 'active' : ''}`} onClick={() => setView('affiliate')}>
          Shopee Affiliate ({affiliateData.length})
        </button>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><Icons.Table /></div>
          <h3>Belum ada data {view === 'ads' ? 'Meta Ads' : 'Shopee Affiliate'}</h3>
          <p>Import file CSV terlebih dahulu</p>
        </div>
      ) : (
        <div className="panel" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Kampanye</th>
                  {view === 'ads' ? (
                    <>
                      <th className="td-num">Spend</th>
                      <th className="td-num">Impresi</th>
                      <th className="td-num">Klik</th>
                    </>
                  ) : (
                    <>
                      <th className="td-num">Komisi</th>
                      <th className="td-num">Pesanan</th>
                      <th className="td-num">Klik</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, MAX_ROWS).map(r => (
                  <tr key={r.id}>
                    <td style={{ fontSize: 11, whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{r.date}</td>
                    <td className="td-camp">{r.campaign}</td>
                    {view === 'ads' ? (
                      <>
                        <td className="td-num">{formatIDR(r.spend)}</td>
                        <td className="td-num td-muted">{formatNumber(r.impressions)}</td>
                        <td className="td-num td-muted">{formatNumber(r.clicks)}</td>
                      </>
                    ) : (
                      <>
                        <td className="td-num">{formatIDR(r.commission)}</td>
                        <td className="td-num td-muted">{formatNumber(r.orders)}</td>
                        <td className="td-num td-muted">{formatNumber(r.clicks)}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length > MAX_ROWS && (
            <div style={{ padding: '8px 14px', fontSize: 11, color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
              Menampilkan {MAX_ROWS} dari {data.length} baris
            </div>
          )}
        </div>
      )}
    </div>
  )
}
