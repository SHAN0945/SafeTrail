'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Shield, ArrowRight, MapPin, Zap, Users, Star, CheckCircle } from 'lucide-react'
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="login-container">
        {/* Animated background elements */}
        <div className="background-elements">
          <div className="bg-orb bg-orb-1"></div>
          <div className="bg-orb bg-orb-2"></div>
          <div className="bg-orb bg-orb-3"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="grid-overlay"></div>

        {/* Main container */}
        <div className="main-grid">
          {/* Left Panel - Branding & Features */}
          <div className="left-panel">
            {/* Header */}
            <div className="header-section">
              <div className="logo-section">
                <div className="logo-container">
                  <div className="logo-icon">
                    <Shield size={40} />
                    <div className="status-indicator">
                      <div className="status-dot"></div>
                    </div>
                  </div>
                  <div className="logo-text">
                    <h1>SafeTour</h1>
                    <p>Smart Tourist Safety Platform</p>
                  </div>
                </div>
                
                <div className="hero-content">
                  <h2>
                    Stay Safe While{" "}
                    <span className="gradient-text">Exploring</span>
                  </h2>
                  <p className="hero-description">
                    Advanced AI-powered safety monitoring system that keeps tourists protected 
                    with real-time danger zone alerts, emergency response capabilities, and comprehensive travel safety tools.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon feature-icon-red">
                  <Zap size={28} />
                </div>
                <div className="feature-content">
                  <h4>Real-Time Alerts</h4>
                  <p>Instant notifications about danger zones and safety threats in your area</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon feature-icon-green">
                  <MapPin size={28} />
                </div>
                <div className="feature-content">
                  <h4>Emergency SOS</h4>
                  <p>One-touch emergency activation with automatic responder contact</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon feature-icon-purple">
                  <Users size={28} />
                </div>
                <div className="feature-content">
                  <h4>Digital ID</h4>
                  <p>Comprehensive identification system for emergency responders</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon feature-icon-blue">
                  <CheckCircle size={28} />
                </div>
                <div className="feature-content">
                  <h4>24/7 Monitoring</h4>
                  <p>Round-the-clock safety monitoring and instant support</p>
                </div>
              </div>
            </div>

            {/* Stats & Social Proof */}
            <div className="stats-section">
              <div className="stat-item">
                <div className="user-avatars">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="avatar">{i}</div>
                  ))}
                </div>
                <div className="stat-content">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Active Users</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stars">
                  {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <div className="stat-content">
                  <div className="stat-number">4.9</div>
                  <div className="stat-label">App Rating</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-content">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="right-panel">
            <div className="form-container">
              <div className="login-card">
                {/* Form Header */}
                <div className="form-header">
                  <div className="form-title">
                    <h3>Welcome Back</h3>
                    <p>Access your safety dashboard and monitoring tools</p>
                  </div>
                </div>

                {/* Login Form */}
                <div className="form-content">
                  <div className="form-fields">
                    {/* Google Login Button */}
                    <div className="submit-section">
                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="google-login-button"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="spinner"></div>
                            Signing you in...
                          </>
                        ) : (
                          <>
                            <svg className="google-icon" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Sign In with Google
                            <ArrowRight size={20} />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Demo Info */}
                    <div className="demo-info">
                      <div className="demo-header">
                        <div className="demo-icon">
                          <Shield size={16} />
                        </div>
                        <p>Quick Demo Access</p>
                      </div>
                      <p>Click "Sign In with Google" to automatically create your SafeTour account and access the dashboard.</p>
                    </div>
                  </div>
                </div>

                {/* Signup CTA */}
                <div className="signup-section">
                  <p>New to SafeTour? Join thousands of travelers who trust us for their safety.</p>
                  <button
                    onClick={() => router.push("/signup")} 
                    className="signup-button"
                    disabled={isLoading}
                  >
                    Learn More About SafeTour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%);
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .background-elements {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: float 20s ease-in-out infinite;
        }

        .bg-orb-1 {
          top: 25%;
          left: 25%;
          width: 384px;
          height: 384px;
          background: rgba(168, 85, 247, 0.2);
        }

        .bg-orb-2 {
          bottom: 25%;
          right: 25%;
          width: 320px;
          height: 320px;
          background: rgba(59, 130, 246, 0.2);
          animation-delay: 5s;
        }

        .bg-orb-3 {
          top: 75%;
          left: 75%;
          width: 256px;
          height: 256px;
          background: rgba(99, 102, 241, 0.2);
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          z-index: 2;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
          background-size: 50px 50px;
        }

        .main-grid {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .left-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 4rem;
        }

        .header-section {
          margin-bottom: 3rem;
        }

        .logo-section {
          margin-bottom: 2rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .logo-icon {
          position: relative;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }

        .status-indicator {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 32px;
          height: 32px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #0f172a;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .logo-text h1 {
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .logo-text p {
          font-size: 1.25rem;
          color: #cbd5e1;
          font-weight: 500;
        }

        .hero-content h2 {
          font-size: 3.75rem;
          font-weight: 700;
          color: white;
          line-height: 1.1;
          margin-bottom: 2rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #fbbf24, #ec4899, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.25rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .feature-card {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .feature-icon-red {
          background: linear-gradient(135deg, #ef4444, #ec4899);
        }

        .feature-icon-green {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .feature-icon-purple {
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
        }

        .feature-icon-blue {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
        }

        .feature-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }

        .feature-content p {
          font-size: 0.875rem;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .stats-section {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          align-items: center;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .user-avatars {
          display: flex;
          margin-right: 0.5rem;
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          border: 2px solid #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          margin-left: -8px;
        }

        .avatar:first-child {
          margin-left: 0;
        }

        .stars {
          display: flex;
          color: #fbbf24;
          margin-right: 0.5rem;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .right-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 4rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .form-container {
          width: 100%;
          max-width: 512px;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          animation: slideInRight 0.8s ease-out;
        }

        .form-header {
          padding: 2.5rem 2.5rem 2rem;
          background: linear-gradient(135deg, #f8fafc, #e0f2fe);
        }

        .form-title {
          text-align: center;
        }

        .form-title h3 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }

        .form-title p {
          font-size: 1.125rem;
          color: #475569;
        }

        .form-content {
          padding: 2rem 2.5rem;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .submit-section {
          padding-top: 1rem;
        }

        .google-login-button {
          width: 100%;
          background: white;
          color: #374151;
          border: 2px solid #e5e7eb;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .google-login-button:hover:not(:disabled) {
          background: #f9fafb;
          border-color: #d1d5db;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .google-login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .google-icon {
          width: 24px;
          height: 24px;
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(55, 65, 81, 0.3);
          border-top: 2px solid #374151;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .demo-info {
          margin-top: 2rem;
          padding: 1.5rem;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 12px;
        }

        .demo-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .demo-icon {
          width: 32px;
          height: 32px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .demo-header p {
          font-size: 0.875rem;
          color: #1e40af;
          font-weight: 600;
          margin: 0;
        }

        .demo-info p:last-child {
          font-size: 0.875rem;
          color: #1e40af;
          margin: 0;
          line-height: 1.5;
        }

        .signup-section {
          background: #f8fafc;
          padding: 2rem 2.5rem;
          border-top: 1px solid #e2e8f0;
          text-align: center;
        }

        .signup-section p {
          color: #475569;
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }

        .signup-button {
          width: 100%;
          background: white;
          border: 2px solid #d1d5db;
          color: #374151;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .signup-button:hover:not(:disabled) {
          border-color: #3b82f6;
          color: #3b82f6;
          background: #eff6ff;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
          transform: translateY(-2px);
        }

        .signup-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .left-panel {
          animation: slideInLeft 0.8s ease-out;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Focus and accessibility improvements */
        .google-login-button:focus,
        .signup-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr;
          }

          .left-panel {
            padding: 2rem;
            order: 2;
          }

          .right-panel {
            padding: 2rem;
            order: 1;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .hero-content h2 {
            font-size: 2.5rem;
          }

          .logo-text h1 {
            font-size: 2rem;
          }

          .stats-section {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .left-panel {
            padding: 1.5rem;
            text-align: center;
          }

          .right-panel {
            padding: 1.5rem;
          }

          .form-header {
            padding: 2rem 2rem 1.5rem;
          }

          .form-content {
            padding: 1.5rem 2rem;
          }

          .signup-section {
            padding: 1.5rem 2rem;
          }

          .hero-content h2 {
            font-size: 2rem;
          }

          .form-title h3 {
            font-size: 2rem;
          }

          .logo-container {
            justify-content: center;
          }

          .features-grid {
            margin-bottom: 2rem;
          }

          .feature-card {
            text-align: left;
          }

          .stats-section {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .left-panel {
            padding: 1rem;
          }

          .right-panel {
            padding: 1rem;
          }

          .form-header {
            padding: 1.5rem 1.5rem 1rem;
          }

          .form-content {
            padding: 1rem 1.5rem;
          }

          .signup-section {
            padding: 1rem 1.5rem;
          }

          .logo-icon {
            width: 60px;
            height: 60px;
          }

          .logo-icon svg {
            width: 30px;
            height: 30px;
          }

          .status-indicator {
            width: 24px;
            height: 24px;
            top: -6px;
            right: -6px;
          }

          .status-dot {
            width: 8px;
            height: 8px;
          }

          .logo-text h1 {
            font-size: 1.75rem;
          }

          .logo-text p {
            font-size: 1rem;
          }

          .hero-content h2 {
            font-size: 1.75rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .form-title h3 {
            font-size: 1.75rem;
          }

          .form-title p {
            font-size: 1rem;
          }

          .features-grid {
            gap: 0.75rem;
          }

          .feature-card {
            padding: 1rem;
          }

          .feature-icon {
            width: 48px;
            height: 48px;
          }

          .feature-icon svg {
            width: 24px;
            height: 24px;
          }

          .feature-content h4 {
            font-size: 1.125rem;
          }

          .feature-content p {
            font-size: 0.875rem;
          }
        }

        /* Enhanced hover effects */
        .google-login-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .signup-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
      `}</style>
    </>
  )
}

export default LoginPage