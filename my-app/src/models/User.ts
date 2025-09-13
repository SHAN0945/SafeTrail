export interface User {
  _id?: string
  name: string
  email: string
  image?: string
  provider: 'google' | 'credentials'
  googleId?: string
  safetyStatus: 'safe' | 'warning' | 'danger'
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface CreateUserData {
  name: string
  email: string
  image?: string
  provider: 'google' | 'credentials'
  googleId?: string
}