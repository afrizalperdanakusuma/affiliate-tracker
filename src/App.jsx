// src/App.jsx
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar  from './components/Topbar'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import Import    from './pages/Import'
import DataRaw   from './pages/DataRaw'
import { useData } from './hooks/useData'

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const {
    adsData, affiliateData,
    mergedData, byDate, byCampaign,
    stats, loading, refresh,
  } = useData()

  return (
    <div className="app-shell">
      <Sidebar
        tab={tab}
        setTab={setTab}
        adsCount={adsData.length}
        affCount={affiliateData.length}
      />

      <div className="main-area">
        <Topbar tab={tab} />

        <main className="content">
          {loading ? (
            <div className="loading-bar" style={{ padding: '3rem', fontSize: 14 }}>
              Memuat data...
            </div>
          ) : (
            <>
              {tab === 'dashboard' && (
                <Dashboard
                  stats={stats}
                  byDate={byDate}
                  byCampaign={byCampaign}
                  mergedData={mergedData}
                />
              )}
              {tab === 'campaigns' && (
                <Campaigns
                  byCampaign={byCampaign}
                  adsData={adsData}
                  affiliateData={affiliateData}
                />
              )}
              {tab === 'import' && (
                <Import onDataChange={refresh} />
              )}
              {tab === 'data' && (
                <DataRaw
                  adsData={adsData}
                  affiliateData={affiliateData}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
