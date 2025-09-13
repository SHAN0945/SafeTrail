import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { userService } from '@/services/userService'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { status } = await req.json()

    if (!['safe', 'warning', 'danger'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    await userService.updateUser(session.user.email, { safetyStatus: status })
    
    return NextResponse.json({ message: 'Status updated', status })

  } catch (error) {
    console.error('Update safety status error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}