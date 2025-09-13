'use client'

import { useState } from 'react'
import { Shield, Eye, EyeOff, Mail, Lock, AlertCircle, ArrowRight, MapPin, Zap, Users, Star, CheckCircle } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* Left Panel - Branding & Features */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Shield size={40} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-slate-900">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white mb-2">SafeTour</h1>
                <p className="text-xl text-slate-300 font-medium">Smart Tourist Safety Platform</p>
              </div>
            </div>
            
            <div className="max-w-2xl">
              <h2 className="text-6xl font-bold text-white mb-8 leading-tight">
                Stay Safe While{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Exploring
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Advanced AI-powered safety monitoring system that keeps tourists protected 
                with real-time danger zone alerts, emergency response capabilities, and comprehensive travel safety tools.
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Zap size={28} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Real-Time Alerts</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Instant notifications about danger zones and safety threats in your area</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin size={28} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Emergency SOS</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">One-touch emergency activation with automatic responder contact</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Users size={28} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Digital ID</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Comprehensive identification system for emergency responders</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <CheckCircle size={28} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">24/7 Monitoring</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Round-the-clock safety monitoring and instant support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Social Proof */}
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-white text-sm font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-slate-400 text-sm">Active Users</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-slate-400 text-sm">App Rating</div>
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-slate-400 text-sm">Uptime</div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex items-center justify-center px-8 lg:px-16 py-12 bg-white/5 backdrop-blur-sm">
          <div className="w-full max-w-lg">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Form Header */}
              <div className="px-10 pt-10 pb-8 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-slate-800 mb-3">Welcome Back</h3>
                  <p className="text-lg text-slate-600">Access your safety dashboard and monitoring tools</p>
                </div>

                {errors.general && (
                  <div className="flex items-center gap-3 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <AlertCircle size={20} className="flex-shrink-0" />
                    <span className="text-sm font-medium">{errors.general}</span>
                  </div>
                )}
              </div>

              {/* Login Form */}
              <div className="px-10 py-8">
                <div className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={22} className="text-slate-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                        placeholder="Enter your email address"
                        className={`w-full pl-14 pr-4 py-4 text-lg bg-slate-50 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:bg-white focus:shadow-lg ${
                          errors.email 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-slate-200 focus:border-blue-500'
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center gap-2 mt-3 text-red-600">
                        <AlertCircle size={16} />
                        <span className="text-sm font-medium">{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-3">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={22} className="text-slate-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                        placeholder="Enter your password"
                        className={`w-full pl-14 pr-14 py-4 text-lg bg-slate-50 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:bg-white focus:shadow-lg ${
                          errors.password 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-slate-200 focus:border-blue-500'
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-slate-100 rounded-r-xl transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? 
                          <EyeOff size={22} className="text-slate-400 hover:text-slate-600" /> : 
                          <Eye size={22} className="text-slate-400 hover:text-slate-600" />
                        }
                      </button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center gap-2 mt-3 text-red-600">
                        <AlertCircle size={16} />
                        <span className="text-sm font-medium">{errors.password}</span>
                      </div>
                    )}
                  </div>

                  {/* Options */}
                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                        disabled={isLoading}
                      />
                      <span className="text-sm text-slate-600 font-medium">Remember me for 30 days</span>
                    </label>
                    
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      onClick={handleForgotPassword}
                      disabled={isLoading}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Signing you in...
                        </>
                      ) : (
                        <>
                          Sign In to Dashboard
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Demo Info */}
                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <p className="text-sm text-blue-800 font-semibold">Demo Account Ready</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-blue-700"><span className="font-medium">Email:</span> demo@safetour.com</p>
                    <p className="text-sm text-blue-700"><span className="font-medium">Password:</span> password</p>
                  </div>
                </div>
              </div>

              {/* Signup CTA */}
              <div className="bg-slate-50 px-10 py-8 border-t border-slate-200">
                <p className="text-center text-slate-600 mb-4 text-lg">
                  New to SafeTour? Join thousands of travelers who trust us for their safety.
                </p>
                <button
                  onClick={handleSignup}
                  className="w-full bg-white border-2 border-slate-300 text-slate-700 py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md"
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
  )
}

export default LoginPage