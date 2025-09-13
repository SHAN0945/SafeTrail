// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Shield, AlertTriangle, Smartphone, UserCheck, Brain, ArrowRight, CheckCircle, Star, Users, MapPin } from 'lucide-react'
import { useRouter } from "next/navigation";

interface FeatureCard {
  id: number
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

interface Step {
  number: number
  title: string
  description: string
}

const LandingPage = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})

  const features: FeatureCard[] = [
    {
      id: 1,
      icon: <AlertTriangle size={28} />,
      title: "Real-Time Danger Alerts",
      description: "AI-powered geo-fencing system that instantly detects and alerts you about high-crime areas, natural disasters, and safety threats.",
      color: "#FF6B6B"
    },
    {
      id: 2,
      icon: <Smartphone size={28} />,
      title: "Emergency SOS System", 
      description: "One-touch emergency activation that instantly contacts local authorities and emergency services with your precise location.",
      color: "#4ECDC4"
    },
    {
      id: 3,
      icon: <UserCheck size={28} />,
      title: "Digital Tourist ID",
      description: "Comprehensive digital identification system for emergency responders including personal details and medical information.",
      color: "#45B7D1"
    },
    {
      id: 4,
      icon: <Brain size={28} />,
      title: "AI Incident Clustering",
      description: "Machine learning algorithms analyze incident patterns to predict and prevent potential safety threats before they escalate.",
      color: "#96CEB4"
    }
  ]

  const steps: Step[] = [
    {
      number: 1,
      title: "Register & Setup",
      description: "Create your digital tourist profile with emergency contacts and travel information on our secure platform"
    },
    {
      number: 2,
      title: "Auto-Monitoring",
      description: "AI continuously monitors your location using geo-fencing technology and analyzes real-time safety data"
    },
    {
      number: 3,
      title: "Stay Protected",
      description: "Receive immediate notifications about danger zones and access one-touch SOS emergency response"
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }))
        }
      })
    }, observerOptions)

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleSmoothScroll = (targetId: string) => {
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="landing-page">
      {/* Header */}
      <header 
        className="header"
        style={{
          background: scrollY > 100 
            ? 'rgba(45, 55, 121, 0.95)' 
            : 'transparent',
          backdropFilter: scrollY > 100 ? 'blur(20px)' : 'none'
        }}
      >
        <nav className="nav">
          <div className="logo">
            <div className="logo-icon">
              <Shield size={24} />
            </div>
            <span>SafeTour</span>
          </div>
          <ul className="nav-links">
            <li>
              <button onClick={() => handleSmoothScroll('features')} className="nav-link">
                Features
              </button>
            </li>
            <li>
              <button onClick={() => handleSmoothScroll('how-it-works')} className="nav-link">
                How It Works
              </button>
            </li>
            <li>
              <button onClick={() => handleSmoothScroll('contact')} className="nav-link">
                Contact
              </button>
            </li>
            <li>
              <button
                className="nav-link login-btn"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <CheckCircle size={16} />
              <span>Trusted by 50K+ travelers worldwide</span>
            </div>
            
            <h1 className="hero-title">
              Smart Tourist <br />
              <span className="gradient-text">Safety Monitoring</span>
            </h1>
            
            <p className="hero-description">
              AI-powered geo-fencing and incident response system that keeps tourists safe with 
              real-time danger zone alerts, SOS functionality, and digital ID for emergency responders.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Protected Travelers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">180+</div>
                <div className="stat-label">Countries Covered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Emergency Response</div>
              </div>
            </div>
            
            <div className="cta-buttons">
              <button onClick={() => router.push("/login")} className="btn btn-primary">
                Get Started Free
                <ArrowRight size={20} />
              </button>
              <button onClick={() => handleSmoothScroll('features')} className="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon fill="currentColor" points="5,3 19,12 5,21"/>
                </svg>
                Watch Demo
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-header">
                  <div className="status-bar">
                    <div className="signal-bars"></div>
                    <div className="battery"></div>
                  </div>
                  <h3>SafeTour Dashboard</h3>
                </div>
                <div className="app-content">
                  <div className="location-card">
                    <MapPin size={18} />
                    <span>Times Square, NYC</span>
                    <div className="safety-status safe">SAFE</div>
                  </div>
                  <div className="alert-card">
                    <AlertTriangle size={18} color="#FF6B6B" />
                    <span>High Crime Area 0.5mi away</span>
                  </div>
                  <div className="features-grid-mobile">
                    {features.map((feature, index) => (
                      <div 
                        key={feature.id}
                        className="feature-mini"
                        style={{ 
                          backgroundColor: feature.color,
                          animationDelay: `${index * 0.2}s`
                        }}
                      >
                        {feature.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Star size={16} />
              <span>Advanced Features</span>
            </div>
            <h2>Cutting-Edge Safety Technology</h2>
            <p>Intelligent monitoring and instant emergency response designed specifically for modern travelers</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                id={`feature-${feature.id}`}
                data-animate
                className={`feature-card ${isVisible[`feature-${feature.id}`] ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="feature-icon"
                  style={{ backgroundColor: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Users size={16} />
              <span>Simple Process</span>
            </div>
            <h2>How SafeTour Protects You</h2>
            <p>Three simple steps to comprehensive travel safety</p>
          </div>
          
          <div className="steps-container">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                id={`step-${step.number}`}
                data-animate
                className={`step ${isVisible[`step-${step.number}`] ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="step-visual">
                  <div className="step-number">{step.number}</div>
                  {index < steps.length - 1 && <div className="step-line"></div>}
                </div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Trusted by Travelers Worldwide</h2>
            <p>See what our users say about staying safe with SafeTour</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <p>"SafeTour saved my trip to Bangkok. Got instant alerts about a protest area and found a safe route."</p>
              <div className="testimonial-author">
                <div className="author-avatar">M</div>
                <div>
                  <div className="author-name">Maria Rodriguez</div>
                  <div className="author-location">Traveled to Thailand</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <p>"The SOS feature gave me peace of mind during my solo backpacking trip across Europe."</p>
              <div className="testimonial-author">
                <div className="author-avatar">J</div>
                <div>
                  <div className="author-name">James Wilson</div>
                  <div className="author-location">Backpacked Europe</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <p>"Easy to use and incredibly helpful. The real-time alerts are spot-on and potentially life-saving."</p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div>
                  <div className="author-name">Sarah Chen</div>
                  <div className="author-location">Business Traveler</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Travel Safely?</h2>
            <p>Join thousands of smart travelers who trust SafeTour for their security</p>
            <div className="cta-buttons">
              <button onClick={() => router.push("/login")} className="btn btn-primary large">
                Start Your Safe Journey
                <ArrowRight size={20} />
              </button>
              <button onClick={() => handleSmoothScroll('features')} className="btn btn-outline">
                Explore All Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <div className="logo-icon">
                  <Shield size={24} />
                </div>
                <span>SafeTour</span>
              </div>
              <p>Advanced AI-powered tourist safety monitoring system providing real-time protection for travelers worldwide.</p>
              <div className="social-links">
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Instagram</a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#">Pricing</a>
                <a href="#">API</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Safety Guidelines</a>
                <a href="#">Emergency Contacts</a>
                <a href="#">Status</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 SafeTour. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .landing-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #ffffff;
          background: linear-gradient(135deg, #2D3779 0%, #4C51BF 25%, #667EEA 50%, #764BA2 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .header {
          position: scroll;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 0;
          transition: all 0.3s ease;
        }

        .nav {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          z-index: 1001;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
          align-items: center;
        }

        .nav-link {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .login-btn {
          background: rgba(255, 255, 255, 0.15) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(10px);
        }

        .login-btn:hover {
          background: rgba(255, 255, 255, 0.25) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 60px;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(102, 126, 234, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .hero-content {
          animation: slideInLeft 1s ease-out;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: #ffffff;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .gradient-text {
          background: linear-gradient(135deg, #60A5FA 0%, #34D399 50%, #F59E0B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        .hero-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 2.5rem;
          line-height: 1.7;
          max-width: 500px;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #60A5FA;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 16px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
          color: #ffffff;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.5);
        }

        .btn-primary.large {
          padding: 1.25rem 2.5rem;
          font-size: 1.1rem;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .btn-outline {
          background: transparent;
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: slideInRight 1s ease-out;
        }

        .phone-mockup {
          width: 280px;
          height: 500px;
          background: linear-gradient(135deg, #1F2937 0%, #374151 100%);
          border-radius: 30px;
          padding: 8px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          animation: float 6s ease-in-out infinite;
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
          border-radius: 24px;
          overflow: hidden;
          position: relative;
        }

        .app-header {
          padding: 1.5rem 1rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .status-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .signal-bars {
          width: 20px;
          height: 12px;
          background: linear-gradient(to right, #60A5FA, #34D399);
          border-radius: 2px;
        }

        .battery {
          width: 24px;
          height: 12px;
          background: #60A5FA;
          border-radius: 2px;
        }

        .app-header h3 {
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }

        .app-content {
          padding: 1rem;
        }

        .location-card {
          background: rgba(96, 165, 250, 0.2);
          border: 1px solid rgba(96, 165, 250, 0.3);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #60A5FA;
          font-size: 0.875rem;
        }

        .safety-status {
          margin-left: auto;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .safety-status.safe {
          background: rgba(34, 197, 94, 0.2);
          color: #22C55E;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .alert-card {
          background: rgba(255, 107, 107, 0.2);
          border: 1px solid rgba(255, 107, 107, 0.3);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #FF6B6B;
          font-size: 0.875rem;
        }

        .features-grid-mobile {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .feature-mini {
          padding: 1rem;
          border-radius: 12px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1;
          animation: slideInUp 0.8s ease-out both;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
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

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .features {
          padding: 100px 0;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .section-header h2 {
          font-size: 2.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .section-header p {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2.5rem;
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateY(30px);
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #60A5FA, #34D399, #F59E0B);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: #ffffff;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-card h3 {
          font-size: 1.375rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .feature-card p {
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .feature-arrow {
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-arrow {
          color: #60A5FA;
          transform: translateX(5px);
        }

        .how-it-works {
          padding: 100px 0;
        }

        .steps-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.6s ease;
        }

        .step.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .step:last-child {
          margin-bottom: 0;
        }

        .step-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 80px;
        }

        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
          margin-bottom: 1rem;
        }

        .step-line {
          width: 2px;
          height: 60px;
          background: linear-gradient(180deg, #3B82F6, transparent);
          border-radius: 1px;
        }

        .step-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #ffffff;
        }

        .step-content p {
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.6;
          font-size: 1.1rem;
        }

        .testimonials {
          padding: 100px 0;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .stars {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .testimonial-card p {
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #60A5FA 0%, #34D399 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .author-name {
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .author-location {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .cta-section {
          padding: 100px 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%);
          backdrop-filter: blur(10px);
        }

        .cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .cta-content p {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2.5rem;
        }

        .footer {
          padding: 60px 0 30px;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-brand p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: 1rem 0;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .social-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }

        .social-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .footer-links {
          display: contents;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-column h4 {
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .footer-column a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 0.25rem 0;
        }

        .footer-column a:hover {
          color: #60A5FA;
          transform: translateX(5px);
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255, 255, 255, 0.6);
        }

        .footer-legal {
          display: flex;
          gap: 2rem;
        }

        .footer-legal a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-legal a:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-stats {
            justify-content: center;
          }

          .phone-mockup {
            width: 240px;
            height: 400px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .step {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .step-line {
            width: 60px;
            height: 2px;
            transform: rotate(90deg);
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .cta-content h2 {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          .phone-mockup {
            width: 200px;
            height: 360px;
          }
        }
      `}</style>
    </div>
  )
}

export default LandingPage