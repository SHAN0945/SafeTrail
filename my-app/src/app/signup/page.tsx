// src/app/signup/page.tsx
'use client'

import { useState } from 'react'
import { Shield, Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react'
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log('Signup attempt:', formData)
    // router.push('/dashboard')
  }

  const features = [
    {
      icon: <AlertTriangle size={20} />,
      title: "Real-Time Alerts",
      description: "Instant notifications about danger zones and safety threats in your area"
    },
    {
      icon: <Phone size={20} />,
      title: "Emergency SOS",
      description: "One-touch emergency activation with automatic responder contact"
    },
    {
      icon: <User size={20} />,
      title: "Digital ID",
      description: "Comprehensive identification for emergency responders"
    },
    {
      icon: <CheckCircle size={20} />,
      title: "24/7 Monitoring",
      description: "Round-the-clock safety monitoring with AI-powered analysis"
    }
  ]

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Features & Branding */}
        <div className="left-section">
          <div className="brand-header">
            <div className="logo">
              <div className="logo-icon">
                <Shield size={24} />
                <div className="status-indicator"></div>
              </div>
              <div className="brand-text">
                <h1>SafeTour</h1>
                <p>Smart Tourist Safety Platform</p>
              </div>
            </div>
          </div>

          <div className="hero-content">
            <h2>
              Join the Future of <br />
              <span className="gradient-text">Safe Travel</span>
            </h2>
            <p>
              Join thousands of smart travelers who trust SafeTour for comprehensive 
              safety monitoring, real-time alerts, and emergency response capabilities 
              worldwide.
            </p>

            <div className="features-list">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="trust-indicators">
              <div className="trust-item">
                <div className="trust-number">50K+</div>
                <div className="trust-label">Protected Travelers</div>
              </div>
              <div className="trust-item">
                <div className="trust-number">180+</div>
                <div className="trust-label">Countries</div>
              </div>
              <div className="trust-item">
                <div className="trust-number">99.9%</div>
                <div className="trust-label">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="right-section">
          <div className="signup-form-container">
            <div className="form-header">
              <h2>Create Your Account</h2>
              <p>Start your journey to safer travels today</p>
            </div>

            <form onSubmit={handleSignup} className="signup-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                    required
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    I agree to SafeTour's <a href="#" className="link">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a>
                  </span>
                </label>
              </div>

              
                  
              

              <button type="submit" className="signup-btn">
                Create Account
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="form-footer">
              <p>Already have an account? <button onClick={() => router.push("/login")} className="link-btn">Sign in here</button></p>
            </div>

            
          </div>
        </div>
      </div>

      <style jsx>{`
        .signup-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #2D3779 0%, #4C51BF 25%, #667EEA 50%, #764BA2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow-x: hidden;
        }

        .signup-container {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1400px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
        }

        .left-section {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .left-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .brand-header {
          position: relative;
          z-index: 2;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .logo-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          position: relative;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
        }

        .status-indicator {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 16px;
          height: 16px;
          background: #22C55E;
          border: 3px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        .brand-text h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.25rem 0;
        }

        .brand-text p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-content h2 {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          color: #ffffff;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #60A5FA 0%, #34D399 50%, #F59E0B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-content > p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 450px;
        }

        .features-list {
          margin-bottom: 2.5rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          animation: slideInLeft 0.6s ease-out both;
        }

        .feature-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(5px);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }

        .feature-content h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 0.25rem 0;
        }

        .feature-content p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.4;
        }

        .trust-indicators {
          display: flex;
          gap: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .trust-item {
          text-align: center;
        }

        .trust-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #60A5FA;
          margin-bottom: 0.25rem;
        }

        .trust-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .right-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .signup-form-container {
          width: 100%;
          max-width: 450px;
          animation: slideInRight 0.8s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: #6B7280;
          font-size: 1rem;
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

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: #9CA3AF;
          z-index: 1;
        }

        .input-wrapper input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          font-size: 1rem;
          background: #ffffff;
          transition: all 0.3s ease;
          color: #1F2937;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .input-wrapper input::placeholder {
          color: #9CA3AF;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: #9CA3AF;
          cursor: pointer;
          padding: 0.25rem;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #6B7280;
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
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          background: #ffffff;
          border: 2px solid #E5E7EB;
          border-radius: 4px;
          position: relative;
          transition: all 0.3s ease;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark {
          background: #3B82F6;
          border-color: #3B82F6;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 2px;
          width: 6px;
          height: 10px;
          border: solid #ffffff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-text {
          font-size: 0.875rem;
          color: #6B7280;
        }

        .link {
          color: #3B82F6;
          text-decoration: none;
          font-weight: 500;
        }

        .link:hover {
          text-decoration: underline;
        }

        .signup-btn {
          background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
          color: #ffffff;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          margin-top: 1rem;
        }

        .signup-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
        }

        .signup-btn:active {
          transform: translateY(0);
        }

        .form-footer {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #E5E7EB;
        }

        .form-footer p {
          color: #6B7280;
          font-size: 0.875rem;
        }

        .link-btn {
          background: none;
          border: none;
          color: #3B82F6;
          cursor: pointer;
          font-weight: 500;
          text-decoration: none;
          padding: 0;
          font-size: inherit;
        }

        .link-btn:hover {
          text-decoration: underline;
        }

        .demo-section {
          margin-top: 1.5rem;
        }

        .demo-divider {
          text-align: center;
          margin: 1.5rem 0 1rem;
          position: relative;
        }

        .demo-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #E5E7EB;
        }

        .demo-divider span {
          background: rgba(255, 255, 255, 0.95);
          padding: 0 1rem;
          color: #9CA3AF;
          font-size: 0.875rem;
          position: relative;
          z-index: 1;
        }

        .demo-btn {
          width: 100%;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          color: #059669;
          padding: 1rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 500;
          position: relative;
        }

        .demo-btn:hover {
          background: rgba(34, 197, 94, 0.15);
          border-color: rgba(34, 197, 94, 0.3);
        }

        .demo-details {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          text-align: right;
        }

        .demo-details small {
          display: block;
          font-size: 0.75rem;
          color: #059669;
          opacity: 0.8;
        }

        @media (max-width: 1024px) {
          .signup-container {
            grid-template-columns: 1fr;
          }

          .left-section {
            padding: 2rem;
            min-height: auto;
          }

          .hero-content h2 {
            font-size: 2rem;
          }

          .trust-indicators {
            gap: 1rem;
          }

          .features-list {
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .left-section {
            padding: 1.5rem;
          }

          .right-section {
            padding: 1.5rem;
          }

          .hero-content h2 {
            font-size: 1.75rem;
          }

          .trust-indicators {
            flex-direction: column;
            text-align: left;
            gap: 1rem;
          }

          .trust-item {
            text-align: left;
          }

          .demo-details {
            position: static;
            transform: none;
            text-align: center;
            margin-top: 0.5rem;
          }

          .demo-btn {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  )
}

export default SignupPage