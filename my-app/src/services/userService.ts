import { MongoClient } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { User, CreateUserData } from '@/models/User'
import bcrypt from 'bcryptjs'

class UserService {
  private async getCollection() {
    const client: MongoClient = await clientPromise
    const db = client.db('safetour')
    return db.collection<User>('users')
  }

  async createUser(userData: CreateUserData): Promise<User> {
    const collection = await this.getCollection()
    
    // Check if user already exists
    const existingUser = await collection.findOne({ email: userData.email })
    if (existingUser) {
      throw new Error('User already exists with this email')
    }

    // Hash password if provided
    let hashedPassword: string | undefined
    if (userData.password) {
      hashedPassword = await bcrypt.hash(userData.password, 12)
    }

    const newUser: Omit<User, '_id'> = {
      name: userData.name,
      email: userData.email,
      image: userData.image,
      provider: userData.provider,
      googleId: userData.googleId,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      safetyStatus: 'safe',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    }

    const result = await collection.insertOne(newUser)
    const user = await collection.findOne({ _id: result.insertedId })
    
    if (!user) {
      throw new Error('Failed to create user')
    }

    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ email })
  }

  async findUserByGoogleId(googleId: string): Promise<User | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ googleId })
  }

  async updateUser(email: string, updateData: Partial<User>): Promise<User | null> {
    const collection = await this.getCollection()
    
    const result = await collection.findOneAndUpdate(
      { email },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: 'after' }
    )

    return result.value
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
}

export const userService = new UserService()