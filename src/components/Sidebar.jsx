// src/components/Sidebar.jsx
import { Icons } from './Icons'

const NAV_MAIN = [
  { id: 'dashboard', label: 'Dashboard',    Icon: Icons.Chart  },
  { id: 'campaigns', label: 'Kampanye',     Icon: Icons.Grid   },
  { id: 'import',    label: 'Import CSV',   Icon: Icons.Upload },
  { id: 'data',      label: 'Data Mentah',  Icon: Icons.Table  },
]

const NAV_SAAS = [
  { id: 'members',  label: 'Members',  Icon: Icons.Users,    disabled: true, badge: 'soon' },
  { id: 'settings', label: 'Settings', Icon: Icons.Settings, disabled: true },
]

export default function Sidebar({ tab, setTab, adsCount, affCount }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-wrap">
          <div className="logo-icon">
            <Icons.Trending />
          </div>
          <div>
            <div className="logo-name">AffiliTrack</div>
            <div className="logo-sub">Shopee × Meta Ads</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section">Menu</div>
        {NAV_MAIN.map(({ id, label, Icon }) => (
          <div
            key={id}
            className={`nav-item ${tab === id ? 'active' : ''}`}
            onClick={() => setTab(id)}
          >
            <Icon />
            {label}
          </div>
        ))}

        <div className="nav-section">SaaS</div>
        {NAV_SAAS.map(({ id, label, Icon, disabled, badge }) => (
          <div key={id} className={`nav-item ${disabled ? 'disabled' : ''}`}>
            <Icon />
            {label}
            {badge && <span className="nav-badge">{badge}</span>}
          </div>
        ))}
      </nav>

      {/* Footer: plan info */}
      <div className="sidebar-footer">
        <div className="plan-card">
          <div className="plan-name">Free Plan</div>
          <div className="plan-desc">
            {adsCount} ads · {affCount} affiliate records
          </div>
          <button className="upgrade-btn" onClick={() => alert('Fitur berbayar coming soon! 🚀')}>
            Upgrade ke Pro →
          </button>
        </div>
      </div>
    </aside>
  )
}
