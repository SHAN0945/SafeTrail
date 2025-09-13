// src/app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { 
  Shield, Bell, MapPin, AlertTriangle, Phone, User, Settings, 
  LogOut, Menu, X, CheckCircle, Clock, Navigation, Smartphone,
  Activity, Globe, Users, BarChart3, TrendingUp, ArrowRight,
  Calendar, MessageCircle, Camera, Search, Filter, Download
} from 'lucide-react'
import { useRouter } from "next/navigation";

interface Alert {
  id: string
  type: 'warning' | 'danger' | 'info'
  title: string
  message: string
  location: string
  time: string
  distance: string
}

interface SafetyScore {
  overall: number
  location: number
  time: number
  crowd: number
}

const DashboardPage = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("Times Square, NYC")
  const [safetyStatus, setSafetyStatus] = useState<'safe' | 'warning' | 'danger'>('safe')
  const [activeTab, setActiveTab] = useState('overview')

  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High Crime Area Nearby',
      message: 'Increased pickpocketing reports in the last 24 hours',
      location: 'Central Park West',
      time: '15 min ago',
      distance: '0.3 miles'
    },
    {
      id: '2',
      type: 'info',
      title: 'Tourist Advisory',
      message: 'Large event causing crowd congestion',
      location: 'Brooklyn Bridge',
      time: '1 hour ago',
      distance: '1.2 miles'
    },
    {
      id: '3',
      type: 'danger',
      title: 'Emergency Alert',
      message: 'Police activity - avoid area temporarily',
      location: 'Columbus Circle',
      time: '2 hours ago',
      distance: '0.8 miles'
    }
  ])

  const [safetyScore] = useState<SafetyScore>({
    overall: 85,
    location: 90,
    time: 80,
    crowd: 85
  })

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={20} /> },
    { id: 'alerts', label: 'Safety Alerts', icon: <AlertTriangle size={20} /> },
    { id: 'location', label: 'Location Tracking', icon: <MapPin size={20} /> },
    { id: 'emergency', label: 'Emergency SOS', icon: <Phone size={20} /> },
    { id: 'profile', label: 'Profile & ID', icon: <User size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ]

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'danger': return '#EF4444'
      case 'warning': return '#F59E0B'
      case 'info': return '#3B82F6'
      default: return '#6B7280'
    }
  }

  const getSafetyColor = (score: number) => {
    if (score >= 80) return '#10B981'
    if (score >= 60) return '#F59E0B'
    return '#EF4444'
  }

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update safety status randomly for demo
      const statuses: ('safe' | 'warning' | 'danger')[] = ['safe', 'safe', 'safe', 'warning', 'safe']
      setSafetyStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <Shield size={24} />
              <div className="status-indicator"></div>
            </div>
            <div className="brand-text">
              <h2>SafeTour</h2>
              <p>Dashboard</p>
            </div>
          </div>
          <button 
            className="sidebar-toggle mobile-only"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">JD</div>
            <div className="user-details">
              <div className="user-name">John Doe</div>
              <div className="user-status">Premium Member</div>
            </div>
          </div>
          <button className="logout-btn" onClick={() => router.push('/login')}>
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button 
              className="sidebar-toggle desktop-hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="location-info">
              <MapPin size={18} />
              <span>{currentLocation}</span>
              <div className={`safety-badge ${safetyStatus}`}>
                {safetyStatus === 'safe' && <CheckCircle size={14} />}
                {safetyStatus === 'warning' && <AlertTriangle size={14} />}
                {safetyStatus === 'danger' && <AlertTriangle size={14} />}
                {safetyStatus.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="header-right">
            <button className="header-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <button className="header-btn">
              <Search size={20} />
            </button>
            <div className="emergency-btn">
              <Phone size={18} />
              <span>SOS</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              {/* Quick Stats */}
              <div className="stats-grid">
                <div className="stat-card primary">
                  <div className="stat-icon">
                    <Shield size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{safetyScore.overall}%</div>
                    <div className="stat-label">Safety Score</div>
                  </div>
                  <div className="stat-trend positive">
                    <TrendingUp size={16} />
                    +5%
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{alerts.length}</div>
                    <div className="stat-label">Active Alerts</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <Clock size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">24/7</div>
                    <div className="stat-label">Monitoring</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <Globe size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">180+</div>
                    <div className="stat-label">Countries</div>
                  </div>
                </div>
              </div>

              {/* Safety Score Breakdown */}
              <div className="card">
                <div className="card-header">
                  <h3>Safety Score Breakdown</h3>
                  <p>Real-time analysis of your current safety metrics</p>
                </div>
                <div className="safety-metrics">
                  <div className="metric">
                    <div className="metric-header">
                      <span>Location Safety</span>
                      <span className="metric-value">{safetyScore.location}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${safetyScore.location}%`,
                          backgroundColor: getSafetyColor(safetyScore.location)
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="metric">
                    <div className="metric-header">
                      <span>Time of Day</span>
                      <span className="metric-value">{safetyScore.time}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${safetyScore.time}%`,
                          backgroundColor: getSafetyColor(safetyScore.time)
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="metric">
                    <div className="metric-header">
                      <span>Crowd Density</span>
                      <span className="metric-value">{safetyScore.crowd}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${safetyScore.crowd}%`,
                          backgroundColor: getSafetyColor(safetyScore.crowd)
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="card">
                <div className="card-header">
                  <h3>Recent Safety Alerts</h3>
                  <button className="view-all-btn">
                    View All
                    <ArrowRight size={16} />
                  </button>
                </div>
                <div className="alerts-list">
                  {alerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="alert-item">
                      <div 
                        className="alert-indicator"
                        style={{ backgroundColor: getAlertColor(alert.type) }}
                      ></div>
                      <div className="alert-content">
                        <div className="alert-header">
                          <h4>{alert.title}</h4>
                          <span className="alert-time">{alert.time}</span>
                        </div>
                        <p>{alert.message}</p>
                        <div className="alert-meta">
                          <span className="alert-location">
                            <MapPin size={14} />
                            {alert.location}
                          </span>
                          <span className="alert-distance">{alert.distance} away</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  <button className="action-card emergency">
                    <Phone size={24} />
                    <span>Emergency SOS</span>
                  </button>
                  <button className="action-card">
                    <Navigation size={24} />
                    <span>Get Directions</span>
                  </button>
                  <button className="action-card">
                    <MessageCircle size={24} />
                    <span>Contact Support</span>
                  </button>
                  <button className="action-card">
                    <Camera size={24} />
                    <span>Report Incident</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="alerts-tab">
              <div className="tab-header">
                <div>
                  <h2>Safety Alerts</h2>
                  <p>Real-time safety notifications in your area</p>
                </div>
                <div className="tab-actions">
                  <button className="btn-secondary">
                    <Filter size={18} />
                    Filter
                  </button>
                  <button className="btn-secondary">
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>

              <div className="alerts-grid">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`alert-card ${alert.type}`}>
                    <div className="alert-card-header">
                      <div className="alert-type-badge">
                        <AlertTriangle size={16} />
                        {alert.type.toUpperCase()}
                      </div>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                    <h3>{alert.title}</h3>
                    <p>{alert.message}</p>
                    <div className="alert-card-footer">
                      <div className="alert-location">
                        <MapPin size={14} />
                        {alert.location} • {alert.distance} away
                      </div>
                      <button className="btn-link">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="emergency-tab">
              <div className="emergency-hero">
                <div className="emergency-content">
                  <h2>Emergency SOS</h2>
                  <p>Instantly contact emergency services and notify your emergency contacts</p>
                  <button className="sos-button">
                    <Phone size={32} />
                    <span>ACTIVATE SOS</span>
                  </button>
                  <p className="sos-warning">Hold for 3 seconds to activate</p>
                </div>
              </div>

              <div className="emergency-info">
                <div className="card">
                  <h3>Emergency Contacts</h3>
                  <div className="contact-list">
                    <div className="contact-item">
                      <div className="contact-avatar">M</div>
                      <div className="contact-details">
                        <div className="contact-name">Mom</div>
                        <div className="contact-phone">+1 (555) 123-4567</div>
                      </div>
                      <button className="contact-call">
                        <Phone size={18} />
                      </button>
                    </div>
                    <div className="contact-item">
                      <div className="contact-avatar">D</div>
                      <div className="contact-details">
                        <div className="contact-name">Dad</div>
                        <div className="contact-phone">+1 (555) 987-6543</div>
                      </div>
                      <button className="contact-call">
                        <Phone size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3>Local Emergency Numbers</h3>
                  <div className="emergency-numbers">
                    <div className="emergency-number">
                      <span>Police</span>
                      <span>911</span>
                    </div>
                    <div className="emergency-number">
                      <span>Fire Department</span>
                      <span>911</span>
                    </div>
                    <div className="emergency-number">
                      <span>Medical Emergency</span>
                      <span>911</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTab !== 'overview' && activeTab !== 'alerts' && activeTab !== 'emergency' && (
            <div className="tab-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">
                  {menuItems.find(item => item.id === activeTab)?.icon}
                </div>
                <h3>{menuItems.find(item => item.id === activeTab)?.label}</h3>
                <p>This section is coming soon. We're working hard to bring you more features.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <style jsx>{`
        .dashboard {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #2D3779 0%, #4C51BF 25%, #667EEA 50%, #764BA2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .sidebar {
          width: 280px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 1000;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .sidebar-open {
          transform: translateX(0);
        }

        .sidebar-header {
          padding: 2rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          position: relative;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }

        .status-indicator {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 12px;
          height: 12px;
          background: #22C55E;
          border: 2px solid #ffffff;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        .brand-text h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1F2937;
          margin: 0;
        }

        .brand-text p {
          font-size: 0.875rem;
          color: #6B7280;
          margin: 0;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          color: #6B7280;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .sidebar-toggle:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #374151;
        }

        .mobile-only {
          display: none;
        }

        .desktop-hidden {
          display: none;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          border: none;
          background: none;
          color: #6B7280;
          text-align: left;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.875rem;
          font-weight: 500;
          width: 100%;
        }

        .nav-item:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
        }

        .nav-item.active {
          background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #60A5FA 0%, #34D399 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1F2937;
        }

        .user-status {
          font-size: 0.75rem;
          color: #6B7280;
        }

        .logout-btn {
          background: none;
          border: none;
          color: #6B7280;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #EF4444;
        }

        .main-content {
          flex: 1;
          margin-left: 0;
          display: flex;
          flex-direction: column;
        }

        .dashboard-header {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .safety-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .safety-badge.safe {
          background: rgba(34, 197, 94, 0.2);
          color: #22C55E;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .safety-badge.warning {
          background: rgba(245, 158, 11, 0.2);
          color: #F59E0B;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .safety-badge.danger {
          background: rgba(239, 68, 68, 0.2);
          color: #EF4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 0.75rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .header-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .notification-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #EF4444;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.125rem 0.375rem;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
        }

        .emergency-btn {
          background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
          color: #ffffff;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          border: none;
          box-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
        }

        .emergency-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(239, 68, 68, 0.4);
        }

        .dashboard-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .stat-card.primary {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 1.875rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #22C55E;
        }

        .card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .card-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 0.5rem 0;
        }

        .card-header p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .view-all-btn {
          background: none;
          border: none;
          color: #60A5FA;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .view-all-btn:hover {
          color: #3B82F6;
        }

        .safety-metrics {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .metric {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-header span:first-child {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .metric-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #ffffff;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .alert-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .alert-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .alert-indicator {
          width: 4px;
          height: 100%;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .alert-content {
          flex: 1;
        }

        .alert-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .alert-header h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .alert-time {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .alert-content p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 0.75rem 0;
          line-height: 1.4;
        }

        .alert-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
        }

        .alert-location {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .alert-distance {
          color: rgba(255, 255, 255, 0.6);
        }

        .quick-actions {
          margin-top: 2rem;
        }

        .quick-actions h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .action-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #ffffff;
          text-align: center;
        }

        .action-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .action-card.emergency {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .action-card.emergency:hover {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.3) 100%);
        }

        .tab-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .tab-header h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.5rem 0;
        }

        .tab-header p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .tab-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .alerts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .alert-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .alert-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .alert-card.danger {
          border-left: 4px solid #EF4444;
        }

        .alert-card.warning {
          border-left: 4px solid #F59E0B;
        }

        .alert-card.info {
          border-left: 4px solid #3B82F6;
        }

        .alert-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .alert-type-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .alert-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 0.75rem 0;
        }

        .alert-card p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          margin: 0 0 1rem 0;
        }

        .alert-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-link {
          background: none;
          border: none;
          color: #60A5FA;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .btn-link:hover {
          color: #3B82F6;
        }

        .emergency-tab {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .emergency-hero {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 20px;
          padding: 3rem 2rem;
          text-align: center;
        }

        .emergency-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .emergency-content p {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
        }

        .sos-button {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
          border: 4px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.875rem;
          box-shadow: 0 8px 32px rgba(239, 68, 68, 0.4);
          margin: 0 auto 1rem;
        }

        .sos-button:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 40px rgba(239, 68, 68, 0.5);
        }

        .sos-warning {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .emergency-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .contact-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #60A5FA 0%, #34D399 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .contact-details {
          flex: 1;
        }

        .contact-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .contact-phone {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .contact-call {
          background: linear-gradient(135d, #22C55E 0%, #16A34A 100%);
          border: none;
          color: #ffffff;
          padding: 0.75rem;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contact-call:hover {
          transform: scale(1.1);
        }

        .emergency-numbers {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .emergency-number {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .emergency-number span:first-child {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .emergency-number span:last-child {
          color: #ffffff;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .tab-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .placeholder-content {
          text-align: center;
          max-width: 400px;
        }

        .placeholder-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 auto 1.5rem;
        }

        .placeholder-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .placeholder-content p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          display: none;
        }

        @media (max-width: 1024px) {
          .sidebar {
            position: fixed;
          }

          .main-content {
            margin-left: 0;
          }

          .desktop-hidden {
            display: block;
          }

          .sidebar-overlay {
            display: block;
          }
        }

        @media (max-width: 768px) {
          .mobile-only {
            display: block;
          }

          .dashboard-header {
            padding: 1rem;
          }

          .dashboard-content {
            padding: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .alerts-grid {
            grid-template-columns: 1fr;
          }

          .emergency-info {
            grid-template-columns: 1fr;
          }

          .tab-header {
            flex-direction: column;
            gap: 1rem;
          }

          .tab-actions {
            width: 100%;
            justify-content: flex-start;
          }

          .location-info span:first-of-type {
            display: none;
          }

          .header-right {
            gap: 0.5rem;
          }

          .emergency-btn span {
            display: none;
          }

          .sos-button {
            width: 120px;
            height: 120px;
          }
        }

        @media (min-width: 1025px) {
          .sidebar {
            position: static;
            transform: translateX(0);
          }

          .main-content {
            margin-left: 280px;
          }
        }
      `}</style>
    </div>
  )
}

export default DashboardPage