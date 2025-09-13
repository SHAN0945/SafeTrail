// lib/auth-helpers.ts - Helper functions for NextAuth v4
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth'

// Server-side session helper
export async function getAuthSession() {
  return await getServerSession(authOptions)
}

// Types for better TypeScript support
export type { Session } from 'next-auth'
export type { JWT } from 'next-auth/jwt'