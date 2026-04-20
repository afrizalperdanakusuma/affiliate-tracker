// src/pages/Dashboard.jsx
import { useRef, useEffect } from 'react'
import { Chart, registerables } from 'chart.js'
import { formatIDR, formatNumber, formatRoas } from '../utils/format'
import { Icons } from '../components/Icons'

Chart.register(...registerables)

const G = { g50:'#f0faf4', g100:'#d6f0e0', g500:'#2e9e65', g600:'#1e7a4a', g700:'#155c37', g800:'#0d3d24' }

function MetricCard({ label, value, sub, subClass = 'neutral', accent = false }) {
  return (
    <div className={`mcard ${accent ? 'accent' : ''}`}>
      <div className="mcard-label">{label}</div>
      <div className="mcard-value">{value}</div>
      {sub && <div className={`mcard-sub ${subClass}`}>{sub}</div>}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon"><Icons.Chart /></div>
      <h3>Belum ada data</h3>
      <p>Import CSV Meta Ads &amp; Shopee di menu <strong>Import CSV</strong></p>
    </div>
  )
}

export default function Dashboard({ stats, byDate, byCampaign, mergedData }) {
  const chartRef = useRef()
  const chartInstance = useRef()

  useEffect(() => {
    if (!chartRef.current || byDate.length === 0) return
    if (chartInstance.current) chartInstance.current.destroy()

    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: byDate.map(d => d.date.slice(5)),
        datasets: [
          {
            label: 'Komisi',
            data: byDate.map(d => d.commission),
            borderColor: G.g500,
            backgroundColor: 'rgba(46,158,101,0.07)',
            tension: 0.35, fill: true,
            pointRadius: 3, pointBackgroundColor: G.g500,
            borderWidth: 2,
          },
          {
            label: 'Spend',
            data: byDate.map(d => d.spend),
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231,76,60,0.05)',
            tension: 0.35, fill: true,
            pointRadius: 2.5, pointBackgroundColor: '#e74c3c',
            borderWidth: 1.8, borderDash: [4, 3],
          },
          {
            label: 'Profit',
            data: byDate.map(d => d.profit),
            borderColor: G.g700,
            tension: 0.35, fill: false,
            pointRadius: 0, borderWidth: 1.5, borderDash: [2, 4],
          },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: c => `${c.dataset.label}: ${formatIDR(c.raw)}` },
            backgroundColor: G.g800,
            titleColor: G.g100, bodyColor: '#fff',
            padding: 10, cornerRadius: 8,
          },
        },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.03)' }, ticks: { font: { size: 10 }, color: '#888', maxTicksLimit: 10 } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10 }, color: '#888', callback: v => formatIDR(v) } },
        },
      },
    })

    return () => chartInstance.current?.destroy()
  }, [byDate])

  if (mergedData.length === 0) return <EmptyState />

  const { totalSpend, totalRevenue, netProfit, roas, totalOrders, cpo } = stats
  const top5 = [...byCampaign].sort((a, b) => b.profit - a.profit).slice(0, 5)

  return (
    <div>
      {/* Metric cards */}
      <div className="metrics-grid">
        <MetricCard
          label="Net Profit" accent
          value={formatIDR(netProfit)}
          sub={netProfit >= 0 ? '▲ Untung' : '▼ Boncos'}
          subClass={netProfit >= 0 ? 'up' : 'down'}
        />
        <MetricCard label="Total Spend"  value={formatIDR(totalSpend)}   sub="Biaya Meta Ads" />
        <MetricCard label="Total Komisi" value={formatIDR(totalRevenue)} sub="Shopee Affiliate" />
        <MetricCard
          label="ROAS"
          value={formatRoas(roas)}
          sub={roas >= 1 ? '▲ Positif' : '▼ Negatif'}
          subClass={roas >= 1 ? 'up' : 'down'}
        />
        <MetricCard label="Total Pesanan"  value={formatNumber(totalOrders)} sub="Terkonfirmasi" />
        <MetricCard label="Cost / Pesanan" value={formatIDR(cpo)}            sub="Efisiensi iklan" />
      </div>

      {/* Line chart */}
      {byDate.length > 1 && (
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Tren Harian — Komisi vs Spend vs Profit</span>
            <div className="chart-legend">
              <span><span className="leg-dot" style={{ background: G.g500 }} /> Komisi</span>
              <span><span className="leg-dot" style={{ background: '#e74c3c' }} /> Spend</span>
              <span><span className="leg-dot" style={{ background: G.g700 }} /> Profit</span>
            </div>
          </div>
          <div style={{ position: 'relative', height: 220 }}>
            <canvas ref={chartRef} role="img" aria-label="Line chart tren harian komisi, spend, dan profit" />
          </div>
        </div>
      )}

      {/* Top 5 campaigns */}
      {top5.length > 0 && (
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Top 5 Kampanye</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Kampanye</th>
                  <th className="td-num">Spend</th>
                  <th className="td-num">Komisi</th>
                  <th className="td-num">Profit</th>
                  <th className="td-num">ROAS</th>
                  <th className="td-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {top5.map(r => (
                  <tr key={r.campaign}>
                    <td className="td-camp">{r.campaign}</td>
                    <td className="td-num td-muted">{formatIDR(r.spend)}</td>
                    <td className="td-num">{formatIDR(r.commission)}</td>
                    <td className={`td-num td-profit ${r.profit >= 0 ? 'up' : 'down'}`}>{formatIDR(r.profit)}</td>
                    <td className="td-num">
                      <span className={`roas-pill ${r.roas >= 1 ? 'up' : 'down'}`}>{formatRoas(r.roas)}</span>
                    </td>
                    <td className="td-center">
                      <span className={`badge ${r.profit >= 0 ? 'badge-green' : 'badge-red'}`}>
                        {r.profit >= 0 ? 'Scale ↑' : 'Kill ✕'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
