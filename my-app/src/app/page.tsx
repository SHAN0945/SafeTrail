// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Shield, AlertTriangle, Smartphone, UserCheck, Brain } from 'lucide-react'
import { useRouter } from "next/navigation";

interface FeatureCard {
  id: number
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
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
      icon: <AlertTriangle size={32} />,
      title: "Real-Time Danger Alerts",
      description: "AI-powered geo-fencing system that instantly detects and alerts you about high-crime areas, natural disasters, political unrest, and health risks in your vicinity.",
      gradient: "linear-gradient(45deg, #ff6b6b, #ee5a24)"
    },
    {
      id: 2,
      icon: <Smartphone size={32} />,
      title: "Emergency SOS System", 
      description: "One-touch emergency activation that instantly contacts local authorities and emergency services with your precise location and digital identification.",
      gradient: "linear-gradient(45deg, #a8e6cf, #3ebd93)"
    },
    {
      id: 3,
      icon: <UserCheck size={32} />,
      title: "Digital Tourist ID",
      description: "Comprehensive digital identification system for emergency responders including personal details, emergency contacts, medical information, and travel itinerary.",
      gradient: "linear-gradient(45deg, #74b9ff, #0984e3)"
    },
    {
      id: 4,
      icon: <Brain size={32} />,
      title: "AI Incident Clustering",
      description: "Machine learning algorithms analyze incident patterns to predict and prevent potential safety threats before they escalate into dangerous situations.",
      gradient: "linear-gradient(45deg, #fdcb6e, #e17055)"
    }
  ]

  const steps: Step[] = [
    {
      number: 1,
      title: "Register & Setup",
      description: "Create your digital tourist profile with emergency contacts and travel information on our secure web platform"
    },
    {
      number: 2,
      title: "Auto-Monitoring",
      description: "AI continuously monitors your location using geo-fencing technology and analyzes real-time safety data"
    },
    {
      number: 3,
      title: "Instant Alerts",
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

    // Observe all feature cards and steps
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

  const handleGetStarted = () => {
    // This would navigate to your main app
    console.log('Navigate to main app')
    // router.push('/dashboard') or window.location.href = '/dashboard'
  }

  return (
    <div className="landing-page">
      {/* Header */}
      <header 
        className="header"
        style={{
          background: scrollY > 100 
        ? 'rgba(102, 126, 234, 0.95)' 
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: scrollY > 100 ? 'blur(20px)' : 'blur(10px)'
        }}
      >
        <nav className="nav">
          <div className="logo">
        <div className="logo-icon">
          <Shield size={20} />
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
          <button onClick={() => handleSmoothScroll('contact')} className="nav-link">
            Contact
          </button>
        </li>
        <li>
          <button
  className="nav-link btn btn-secondary"
  style={{ marginLeft: "0.5rem" }}
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
        <div className="hero-content">
          <h1>Smart Tourist Safety Monitoring</h1>
          <p>
            AI-powered geo-fencing and incident response system that keeps tourists safe with 
            real-time danger zone alerts, SOS functionality, and digital ID for emergency responders.
          </p>
          <div className="cta-buttons">
            <button onClick={() => router.push("/login")} className="btn btn-primary pulse">
              Get Started
            </button>
            <button onClick={() => handleSmoothScroll('how-it-works')} className="btn btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-title">
            <h2>Advanced Safety Features</h2>
            <p>Cutting-edge technology designed to keep tourists safe with intelligent monitoring and instant emergency response</p>
          </div>
          <div className="features-grid">
            {features.map((feature) => (
              <div 
                key={feature.id}
                id={`feature-${feature.id}`}
                data-animate
                className={`feature-card ${isVisible[`feature-${feature.id}`] ? 'visible' : ''}`}
              >
                <div 
                  className="feature-icon"
                  style={{ background: feature.gradient }}
                >
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-title">
            <h2>How SafeTour Works</h2>
            <p>Simple, intelligent, and effective safety monitoring in three easy steps</p>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                id={`step-${step.number}`}
                data-animate
                className={`step ${isVisible[`step-${step.number}`] ? 'visible' : ''}`}
              >
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Stay Safe While Exploring</h2>
          <p>Join thousands of tourists who trust SafeTour for their safety and security</p>
          <div className="cta-buttons">
            <button onClick={() => router.push("/login")} className="btn btn-primary">
              Start Using SafeTour
            </button>
            <button onClick={() => handleSmoothScroll('features')} className="btn btn-secondary">
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>SafeTour</h3>
              <p>Advanced AI-powered tourist safety monitoring system providing real-time protection and emergency response for travelers worldwide.</p>
            </div>
            <div className="footer-section">
              <h3>Features</h3>
              <p><button onClick={() => handleSmoothScroll('features')} className="footer-link">Danger Zone Alerts</button></p>
              <p><button onClick={() => handleSmoothScroll('features')} className="footer-link">SOS Emergency System</button></p>
              <p><button onClick={() => handleSmoothScroll('features')} className="footer-link">Digital Tourist ID</button></p>
              <p><button onClick={() => handleSmoothScroll('features')} className="footer-link">AI Incident Clustering</button></p>
            </div>
            <div className="footer-section">
              <h3>Support</h3>
              <p><a href="#" className="footer-link">Help Center</a></p>
              <p><a href="#" className="footer-link">Safety Guidelines</a></p>
              <p><a href="#" className="footer-link">Emergency Contacts</a></p>
              <p><a href="#" className="footer-link">Privacy Policy</a></p>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>📧 safety@safetour.app</p>
              <p>📞 +1-800-SAFETOUR</p>
              <p>🌐 www.safetour.app</p>
              <p>📍 24/7 Emergency Response</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 SafeTour. All rights reserved. | Protecting tourists with advanced AI technology</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .landing-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }

        .header {
          color: white;
          padding: 1rem 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }

        .nav-link {
          color: white;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 1rem;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 120px 0 80px;
          text-align: center;
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
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="white" stop-opacity="0.1"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="300" r="100" fill="url(%23a)"/><circle cx="800" cy="200" r="150" fill="url(%23a)"/><circle cx="900" cy="800" r="120" fill="url(%23a)"/></svg>');
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          animation: slideInUp 1s ease-out;
        }

        .hero p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          opacity: 0.95;
          animation: slideInUp 1s ease-out 0.2s both;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: slideInUp 1s ease-out 0.4s both;
        }

        .btn {
          padding: 15px 30px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          color: white;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }

        .btn:active {
          transform: scale(0.95);
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .features {
          padding: 80px 0;
          background: linear-gradient(45deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #2d3436;
        }

        .section-title p {
          font-size: 1.2rem;
          color: #636e72;
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.6s ease;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
        }

        .feature-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(10deg);
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #2d3436;
        }

        .feature-card p {
          color: #636e72;
          line-height: 1.7;
        }

        .how-it-works {
          padding: 80px 0;
          background: white;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .step {
          text-align: center;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .step.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1.5rem;
          position: relative;
          z-index: 2;
        }

        .step::after {
          content: '';
          position: absolute;
          top: 30px;
          left: calc(100% - 30px);
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #667eea, transparent);
          z-index: 1;
        }

        .step:last-child::after {
          display: none;
        }

        .step h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #2d3436;
        }

        .step p {
          color: #636e72;
          line-height: 1.6;
        }

        .cta-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .footer {
          background: #2d3436;
          color: white;
          padding: 50px 0 20px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          margin-bottom: 1rem;
          color: #74b9ff;
        }

        .footer-section p {
          color: #ddd;
          line-height: 1.8;
        }

        .footer-link {
          color: #ddd;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          line-height: 1.8;
          padding: 0;
          font-size: 1rem;
        }

        .footer-link:hover {
          color: #74b9ff;
        }

        .footer-bottom {
          border-top: 1px solid #636e72;
          padding-top: 1rem;
          text-align: center;
          color: #b2bec3;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .hero p {
            font-size: 1.1rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .step::after {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default LandingPage