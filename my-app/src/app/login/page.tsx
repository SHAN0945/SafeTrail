'use client'

import { useState } from 'react'
import { Shield, Eye, EyeOff, Mail, Lock, AlertCircle, ArrowRight, MapPin, Zap, Users, Star, CheckCircle } from 'lucide-react'
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (formData.email === 'demo@safetour.com' && formData.password === 'password') {
        console.log('Login successful:', formData)
        alert('Login successful! Redirecting to dashboard...')
      } else {
        setErrors({ general: 'Invalid email or password. Please try again.' })
      }
      
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'An error occurred. Please try again later.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = () => {
    console.log('Navigate to signup page')
  }

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password page')
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

                  {errors.general && (
                    <div className="error-alert">
                      <AlertCircle size={20} />
                      <span>{errors.general}</span>
                    </div>
                  )}
                </div>

                {/* Login Form */}
                <div className="form-content">
                  <div className="form-fields">
                    {/* Email Field */}
                    <div className="field-group">
                      <label htmlFor="email">Email Address</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <Mail size={22} />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                          placeholder="Enter your email address"
                          className={errors.email ? 'error' : ''}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.email && (
                        <div className="field-error">
                          <AlertCircle size={16} />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="field-group">
                      <label htmlFor="password">Password</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <Lock size={22} />
                        </div>
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                          placeholder="Enter your password"
                          className={errors.password ? 'error' : ''}
                          disabled={isLoading}
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
                      {errors.password && (
                        <div className="field-error">
                          <AlertCircle size={16} />
                          <span>{errors.password}</span>
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="form-options">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.rememberMe}
                          onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                          disabled={isLoading}
                        />
                        <span className="checkbox-text">Remember me for 30 days</span>
                      </label>
                      
                      <button
                        type="button"
                        className="forgot-link"
                        onClick={handleForgotPassword}
                        disabled={isLoading}
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-section">
                      <button
                        type="button"
                        onClick={handleLogin}
                        className="login-button"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="spinner"></div>
                            Signing you in...
                          </>
                        ) : (
                          <>
                            Sign In to Dashboard
                            <ArrowRight size={20} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Demo Info */}
                  <div className="demo-info">
                    <div className="demo-header">
                      <div className="demo-icon">
                        <CheckCircle size={16} />
                      </div>
                      <p>Demo Account Ready</p>
                    </div>
                    <div className="demo-credentials">
                      <p><span>Email:</span> demo@safetour.com</p>
                      <p><span>Password:</span> password</p>
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
                    Create Your Account
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
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .feature-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
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

        .error-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          padding: 1rem 1.25rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          color: #dc2626;
        }

        .error-alert span {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .form-content {
          padding: 2rem 2.5rem;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
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

        .input-container input.error {
          border-color: #dc2626;
        }

        .input-container input.error:focus {
          border-color: #dc2626;
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.15);
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

        .field-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
          color: #dc2626;
        }

        .field-error span {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          accent-color: #3b82f6;
          border: 1px solid #d1d5db;
          border-radius: 4px;
        }

        .checkbox-text {
          font-size: 0.875rem;
          color: #475569;
          font-weight: 500;
        }

        .forgot-link {
          background: none;
          border: none;
          color: #3b82f6;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .forgot-link:hover:not(:disabled) {
          color: #1d4ed8;
        }

        .forgot-link:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .submit-section {
          padding-top: 1rem;
        }

        .login-button {
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

        .login-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.35);
        }

        .login-button:disabled {
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

        .demo-credentials {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .demo-credentials p {
          font-size: 0.875rem;
          color: #1e40af;
          margin: 0;
        }

        .demo-credentials span {
          font-weight: 500;
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
        }

        .signup-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
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

          .form-options {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
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

        /* Focus and accessibility improvements */
        .login-button:focus,
        .signup-button:focus,
        .forgot-link:focus,
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

        /* Enhanced animations */
        .feature-card {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }

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

        .login-card {
          animation: slideInRight 0.8s ease-out;
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

        /* Smooth transitions for interactive elements */
        .feature-card,
        .login-button,
        .signup-button,
        .input-container input,
        .password-toggle,
        .forgot-link {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Loading state improvements */
        .login-button:disabled .spinner {
          margin-right: 0.5rem;
        }

        /* Enhanced hover effects */
        .feature-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .login-button:hover:not(:disabled) {
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