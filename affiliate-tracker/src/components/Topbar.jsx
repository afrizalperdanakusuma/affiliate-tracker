// src/components/Topbar.jsx
import { Icons } from './Icons'

const PAGE_META = {
  dashboard: { title: 'Dashboard',     badge: 'Overview'              },
  campaigns: { title: 'Kampanye',      badge: 'Analisis per kampanye' },
  import:    { title: 'Import CSV',    badge: 'Smart importer'        },
  data:      { title: 'Data Mentah',   badge: 'Raw records'           },
}

export default function Topbar({ tab }) {
  const { title, badge } = PAGE_META[tab] || PAGE_META.dashboard
  const initials = 'AU'

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-title">{title}</span>
        <span className="topbar-badge">{badge}</span>
      </div>
      <div className="topbar-right">
        <button className="notif-btn" title="Notifikasi">
          <Icons.Bell />
          <span className="notif-dot" />
        </button>
        <div className="user-chip">
          <div className="avatar">{initials}</div>
          <div>
            <div className="user-name">Affiliate User</div>
            <div className="user-plan">Free Plan</div>
          </div>
        </div>
      </div>
    </header>
  )
}
