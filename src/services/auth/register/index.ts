'use server'

interface CreateUser {
  email: string
  name: string
  password: string
}

export async function createUser(data: CreateUser) {}
