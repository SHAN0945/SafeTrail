'use client'

import { useState } from 'react'
import { Shield, Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, ArrowRight, AlertTriangle, MapPin, Zap, Users, Star } from 'lucide-react'
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Signup attempt:', formData)
    setIsLoading(false)
    // router.push('/dashboard')
  }

  const features = [
    {
      icon: <Zap size={28} />,
      title: "Real-Time Alerts",
      description: "Instant notifications about danger zones and safety threats",
      color: "feature-icon-red"
    },
    {
      icon: <MapPin size={28} />,
      title: "Emergency SOS",
      description: "One-touch emergency activation with automatic responder contact",
      color: "feature-icon-green"
    },
    {
      icon: <Users size={28} />,
      title: "Digital ID",
      description: "Comprehensive identification for emergency responders",
      color: "feature-icon-purple"
    },
    {
      icon: <CheckCircle size={28} />,
      title: "24/7 Monitoring",
      description: "Round-the-clock safety monitoring with AI-powered analysis",
      color: "feature-icon-blue"
    }
  ]

  return (
    <>
      <div className="signup-container">
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
                    Join the Future of{" "}
                    <span className="gradient-text">Safe Travel</span>
                  </h2>
                  <p className="hero-description">
                    Join thousands of smart travelers who trust SafeTour for comprehensive 
                    safety monitoring, real-time alerts, and emergency response capabilities worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className={`feature-icon ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
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
                  <div className="stat-label">Protected Travelers</div>
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

          {/* Right Panel - Signup Form */}
          <div className="right-panel">
            <div className="form-container">
              <div className="signup-card">
                {/* Form Header */}
                <div className="form-header">
                  <div className="form-title">
                    <h3>Create Your Account</h3>
                    <p>Start your journey to safer travels today</p>
                  </div>
                </div>

                {/* Signup Form */}
                <div className="form-content">
                  <form onSubmit={handleSignup} className="signup-form">
                    <div className="form-row">
                      <div className="field-group">
                        <label htmlFor="firstName">First Name</label>
                        <div className="input-container">
                          <div className="input-icon">
                            <User size={22} />
                          </div>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>

                      <div className="field-group">
                        <label htmlFor="lastName">Last Name</label>
                        <div className="input-container">
                          <div className="input-icon">
                            <User size={22} />
                          </div>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="field-group">
                      <label htmlFor="email">Email Address</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <Mail size={22} />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    <div className="field-group">
                      <label htmlFor="phone">Phone Number</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <Phone size={22} />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    <div className="field-group">
                      <label htmlFor="password">Password</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <Lock size={22} />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                      </div>
                    </div>

                    <div className="field-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <Lock size={22} />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                      </div>
                    </div>

                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          required
                        />
                        <span className="checkbox-text">
                          I agree to SafeTour's <a href="#" className="link">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a>
                        </span>
                      </label>
                    </div>

                    <div className="submit-section">
                      <button
                        type="submit"
                        className="signup-button"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="spinner"></div>
                            Creating your account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight size={20} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Login CTA */}
                <div className="login-section">
                  <p>Already have an account? Welcome back!</p>
                  <button
                    onClick={() => router.push("/login")} 
                    className="login-button"
                    disabled={isLoading}
                  >
                    Sign In to Dashboard
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

        .signup-container {
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
          animation: slideInLeft 0.8s ease-out;
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

        .signup-card {
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

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
        }

        .field-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.75rem;
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          z-index: 1;
          color: #9ca3af;
        }

        .input-container input {
          width: 100%;
          padding: 1rem 1rem 1rem 3.5rem;
          font-size: 1.125rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .input-container input:focus {
          outline: none;
          background: white;
          border-color: #3b82f6;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .input-container input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .password-toggle:hover:not(:disabled) {
          color: #374151;
          background: #f1f5f9;
        }

        .password-toggle:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .checkbox-group {
          margin: 0.5rem 0;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
          line-height: 1.5;
        }

        .checkbox-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          accent-color: #3b82f6;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          margin-top: 2px;
        }

        .checkbox-text {
          font-size: 0.875rem;
          color: #475569;
          font-weight: 500;
        }

        .link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }

        .link:hover {
          text-decoration: underline;
        }

        .submit-section {
          padding-top: 1rem;
        }

        .signup-button {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
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
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.25);
        }

        .signup-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.35);
          transform: translateY(-2px);
        }

        .signup-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .login-section {
          background: #f8fafc;
          padding: 2rem 2.5rem;
          border-top: 1px solid #e2e8f0;
          text-align: center;
        }

        .login-section p {
          color: #475569;
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }

        .login-button {
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

        .login-button:hover:not(:disabled) {
          border-color: #3b82f6;
          color: #3b82f6;
          background: #eff6ff;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
          transform: translateY(-2px);
        }

        .login-button:disabled {
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
        .signup-button:focus,
        .login-button:focus,
        .password-toggle:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .checkbox-label:focus-within input[type="checkbox"] {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .input-container input:focus {
          outline: none;
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

          .form-row {
            grid-template-columns: 1fr;
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

          .login-section {
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

          .login-section {
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

          .input-container input {
            padding: 0.875rem 0.875rem 0.875rem 3rem;
            font-size: 1rem;
          }

          .input-icon {
            left: 0.875rem;
          }

          .password-toggle {
            right: 0.875rem;
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

        /* Smooth transitions for interactive elements */
        .feature-card,
        .signup-button,
        .login-button,
        .input-container input,
        .password-toggle {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced hover effects */
        .signup-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
      `}</style>
    </>
  )
}

export default SignupPage