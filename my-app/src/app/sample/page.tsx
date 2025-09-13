// src/app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Shield, MapPin, AlertTriangle, Phone, User, Settings, LogOut, Bell, Calendar, Activity } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

// app/dashboard/page.tsx - Example server component with auth
import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/auth-helpers'

// Removed duplicate default export DashboardPage to resolve multiple default exports error.



interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: 'safe' | 'warning' | 'danger'
}

interface Alert {
  id: string
  type: 'danger' | 'warning' | 'info'
  title: string
  description: string
  location: string
  timestamp: string
}

interface Emergency {
  id: string
  userId: string
  status: 'active' | 'resolved' | 'pending'
  type: 'sos' | 'medical' | 'security'
  location: string
  timestamp: string
}
const Dashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/login')
  }, [session, status, router])

  const [user, setUser] = useState<User>({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    status: 'safe'
  })

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Weather Alert',
      description: 'Heavy rain expected in your area',
      location: 'New Delhi, India',
      timestamp: '2025-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'danger',
      title: 'Security Alert',
      description: 'Avoid Main Street area due to protests',
      location: 'Downtown Area',
      timestamp: '2025-01-15T09:15:00Z'
    }
  ])

  const [emergencies, setEmergencies] = useState<Emergency[]>([
    {
      id: '1',
      userId: '1',
      status: 'resolved',
      type: 'sos',
      location: 'Hotel Paradise, Room 205',
      timestamp: '2025-01-14T18:45:00Z'
    }
  ])

  const [isLoading, setIsLoading] = useState(false)

  // Backend API functions for testing
  const testBackendFunctions = {
    // User Management
    getUserProfile: async () => {
      setIsLoading(true)
      try {
        console.log('Testing: GET /api/user/profile')
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Response: User profile data')
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
      setIsLoading(false)
    },

    updateUserProfile: async () => {
      setIsLoading(true)
      try {
        console.log('Testing: PUT /api/user/profile', user)
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Response: Profile updated successfully')
      } catch (error) {
        console.error('Error updating profile:', error)
      }
      setIsLoading(false)
    },

    // Safety Status
    updateSafetyStatus: async (status: 'safe' | 'warning' | 'danger') => {
      setIsLoading(true)
      try {
        console.log('Testing: POST /api/safety/status', { status })
        await new Promise(resolve => setTimeout(resolve, 500))
        setUser(prev => ({ ...prev, status }))
        console.log('Response: Safety status updated')
      } catch (error) {
        console.error('Error updating safety status:', error)
      }
      setIsLoading(false)
    },

    // Alerts
    getAlerts: async () => {
      setIsLoading(true)
      try {
        console.log('Testing: GET /api/alerts')
        await new Promise(resolve => setTimeout(resolve, 800))
        console.log('Response: Alerts data', alerts)
      } catch (error) {
        console.error('Error fetching alerts:', error)
      }
      setIsLoading(false)
    },

    // Emergency
    triggerEmergency: async (type: 'sos' | 'medical' | 'security') => {
      setIsLoading(true)
      try {
        console.log('Testing: POST /api/emergency/trigger', { type, location: 'Current Location' })
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const newEmergency: Emergency = {
          id: Date.now().toString(),
          userId: user.id,
          status: 'active',
          type,
          location: 'Current Location',
          timestamp: new Date().toISOString()
        }
        setEmergencies(prev => [newEmergency, ...prev])
        console.log('Response: Emergency triggered successfully')
      } catch (error) {
        console.error('Error triggering emergency:', error)
      }
      setIsLoading(false)
    },

    getEmergencies: async () => {
      setIsLoading(true)
      try {
        console.log('Testing: GET /api/emergency/history')
        await new Promise(resolve => setTimeout(resolve, 600))
        console.log('Response: Emergency history', emergencies)
      } catch (error) {
        console.error('Error fetching emergencies:', error)
      }
      setIsLoading(false)
    }
  }
const handleLogout = () => signOut({ callbackUrl: '/login' })
  // const handleLogout = () => {
  //   console.log('Testing: POST /api/auth/logout')
  //   router.push('/login')
  // }
  if (status === 'loading') return <div>Loading...</div>
  if (!session) return null
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="logo">
              <Shield size={24} />
              <span>SafeTour Dashboard</span>
            </div>
            <div className="header-actions">
              <button className="icon-btn">
                <Bell size={20} />
              </button>
              <button className="icon-btn">
                <Settings size={20} />
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Sidebar */}
          <aside className="sidebar">
            <nav className="nav-menu">
              <a href="#" className="nav-item active">
                <Activity size={20} />
                Dashboard
              </a>
              <a href="#" className="nav-item">
                <MapPin size={20} />
                Map with Danger Zones
              </a>
              <a href="#" className="nav-item">
                <AlertTriangle size={20} />
                Send SOS Alerts
              </a>
              <a href="#" className="nav-item">
                <Phone size={20} />
                Emergency Contacts for User
              </a>
              <a href="#" className="nav-item">
                <User size={20} />
                Profile
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="main-content">
            {/* User Status Card */}
            <div className="status-card">
              <h2>Current Status</h2>
              <div className="status-info">
                <div className={`status-indicator ${user.status}`}></div>
                <span className="status-text">{user.status.toUpperCase()}</span>
              </div>
              <div className="status-actions">
                <button 
                  className="btn btn-green" 
                  onClick={() => testBackendFunctions.updateSafetyStatus('safe')}
                  disabled={isLoading}
                >
                  Mark Safe
                </button>
                <button 
                  className="btn btn-orange" 
                  onClick={() => testBackendFunctions.updateSafetyStatus('warning')}
                  disabled={isLoading}
                >
                  Mark Warning
                </button>
                <button 
                  className="btn btn-red" 
                  onClick={() => testBackendFunctions.updateSafetyStatus('danger')}
                  disabled={isLoading}
                >
                  Mark Danger
                </button>
              </div>
            </div>

            {/* Emergency Actions */}
            <div className="emergency-card">
              <h2>Emergency Actions</h2>
              <div className="emergency-buttons">
                <button 
                  className="emergency-btn sos"
                  onClick={() => testBackendFunctions.triggerEmergency('sos')}
                  disabled={isLoading}
                >
                  <Phone size={24} />
                  SOS Emergency
                </button>
                <button 
                  className="emergency-btn medical"
                  onClick={() => testBackendFunctions.triggerEmergency('medical')}
                  disabled={isLoading}
                >
                  <Activity size={24} />
                  Medical Emergency
                </button>
                <button 
                  className="emergency-btn security"
                  onClick={() => testBackendFunctions.triggerEmergency('security')}
                  disabled={isLoading}
                >
                  <Shield size={24} />
                  Security Emergency
                </button>
              </div>
            </div>

            {/* Backend Testing Panel */}
            <div className="testing-panel">
              <h2>Backend API Testing</h2>
              <div className="test-buttons">
                <button 
                  className="test-btn" 
                  onClick={testBackendFunctions.getUserProfile}
                  disabled={isLoading}
                >
                  Test Get User Profile
                </button>
                <button 
                  className="test-btn" 
                  onClick={testBackendFunctions.updateUserProfile}
                  disabled={isLoading}
                >
                  Test Update Profile
                </button>
                <button 
                  className="test-btn" 
                  onClick={testBackendFunctions.getAlerts}
                  disabled={isLoading}
                >
                  Test Get Alerts
                </button>
                <button 
                  className="test-btn" 
                  onClick={testBackendFunctions.getEmergencies}
                  disabled={isLoading}
                >
                  Test Get Emergencies
                </button>
              </div>
              <div className="test-note">
                <p>Check browser console for API call logs and responses.</p>
                <p>Replace console.log statements with actual API calls.</p>
              </div>
            </div>

            {/* Alerts List */}
            <div className="alerts-section">
              <h2>Recent Alerts</h2>
              <div className="alerts-list">
                {alerts.map(alert => (
                  <div key={alert.id} className={`alert-item ${alert.type}`}>
                    <div className="alert-header">
                      <AlertTriangle size={20} />
                      <h3>{alert.title}</h3>
                      <span className="alert-time">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p>{alert.description}</p>
                    <p className="alert-location">
                      <MapPin size={16} />
                      {alert.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency History */}
            <div className="emergency-history">
              <h2>Emergency History</h2>
              <div className="emergency-list">
                {emergencies.map(emergency => (
                  <div key={emergency.id} className={`emergency-item ${emergency.status}`}>
                    <div className="emergency-header">
                      <Phone size={20} />
                      <h3>{emergency.type.toUpperCase()} Emergency</h3>
                      <span className={`status-badge ${emergency.status}`}>{emergency.status}</span>
                    </div>
                    <p>Location: {emergency.location}</p>
                    <p>Time: {new Date(emergency.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* User Profile Info */}
            <div className="profile-section">
              <h2>Profile Information</h2>
              <div className="profile-info">
                <div className="info-item">
                  <label>Name:</label>
                  <span>{user.firstName} {user.lastName}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{user.phone}</span>
                </div>
                <div className="info-item">
                  <label>User ID:</label>
                  <span>{user.id}</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem 2rem;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-btn {
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 8px;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: #f1f5f9;
          color: #1e293b;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background 0.2s;
        }

        .logout-btn:hover {
          background: #dc2626;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
          padding: 2rem;
        }

        .sidebar {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          height: fit-content;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: #64748b;
          text-decoration: none;
          transition: all 0.2s;
        }

        .nav-item:hover, .nav-item.active {
          background: #f1f5f9;
          color: #1e293b;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .status-card, .emergency-card, .testing-panel, .alerts-section, .emergency-history, .profile-section {
          background: white;
          border-radius: 12px; 
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .status-card h2, .emergency-card h2, .testing-panel h2, .alerts-section h2, .emergency-history h2, .profile-section h2 {
          margin: 0 0 1rem 0;
          color: #1e293b;
          font-size: 1.25rem;
        }

        .status-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .status-indicator.safe { background: #22c55e; }
        .status-indicator.warning { background: #f59e0b; }
        .status-indicator.danger { background: #ef4444; }

        .status-text {
          font-weight: 600;
          font-size: 1.125rem;
        }

        .status-actions {
          display: flex;
          gap: 1rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-green { background: #22c55e; color: white; }
        .btn-green:hover:not(:disabled) { background: #16a34a; }

        .btn-orange { background: #f59e0b; color: white; }
        .btn-orange:hover:not(:disabled) { background: #d97706; }

        .btn-red { background: #ef4444; color: white; }
        .btn-red:hover:not(:disabled) { background: #dc2626; }

        .emergency-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .emergency-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .emergency-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .emergency-btn.sos {
          background: #ef4444;
          color: white;
        }

        .emergency-btn.sos:hover:not(:disabled) {
          background: #dc2626;
          transform: translateY(-2px);
        }

        .emergency-btn.medical {
          background: #f59e0b;
          color: white;
        }

        .emergency-btn.medical:hover:not(:disabled) {
          background: #d97706;
          transform: translateY(-2px);
        }

        .emergency-btn.security {
          background: #3b82f6;
          color: white;
        }

        .emergency-btn.security:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-2px);
        }

        .testing-panel {
          border: 2px dashed #e2e8f0;
          background: #f8fafc;
        }

        .test-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .test-btn {
          background: #6366f1;
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .test-btn:hover:not(:disabled) {
          background: #5b21b6;
        }

        .test-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .test-note {
          background: #fef3c7;
          border: 1px solid #fbbf24;
          border-radius: 8px;
          padding: 1rem;
        }

        .test-note p {
          margin: 0;
          font-size: 0.875rem;
          color: #92400e;
        }

        .test-note p:first-child {
          margin-bottom: 0.5rem;
        }

        .alerts-list, .emergency-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .alert-item, .emergency-item {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
        }

        .alert-item.danger, .emergency-item.active {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .alert-item.warning {
          border-color: #f59e0b;
          background: #fffbeb;
        }

        .alert-item.info {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .emergency-item.resolved {
          border-color: #22c55e;
          background: #f0fdf4;
        }

        .alert-header, .emergency-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .alert-header h3, .emergency-header h3 {
          margin: 0;
          flex-grow: 1;
          font-size: 1rem;
        }

        .alert-time {
          font-size: 0.875rem;
          color: #64748b;
        }

        .status-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .status-badge.active {
          background: #ef4444;
          color: white;
        }

        .status-badge.resolved {
          background: #22c55e;
          color: white;
        }

        .status-badge.pending {
          background: #f59e0b;
          color: white;
        }

        .alert-location {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: #64748b;
          margin: 0.5rem 0 0 0;
        }

        .profile-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-item label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        .info-item span {
          color: #1e293b;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .dashboard-content {
            grid-template-columns: 1fr;
            padding: 1rem;
          }

          .header-content {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .emergency-buttons {
            grid-template-columns: 1fr;
          }

          .test-buttons {
            grid-template-columns: 1fr;
          }

          .status-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard