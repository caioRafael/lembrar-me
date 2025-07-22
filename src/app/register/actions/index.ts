'use server'

import { signUp } from '@/services/auth/cognito'
import { ServiceException } from '@aws-sdk/smithy-client'

interface CreateUser {
  name: string
  email: string
  password: string
}

export async function registerUser(formData: CreateUser) {
  try {
    const res = await signUp(formData.email, formData.password, formData.name)
    return { success: true, message: 'Usuário criado com sucesso.', data: res }
  } catch (error: unknown) {
    if (error instanceof ServiceException) {
      console.error('Erro Cognito:', error.name, error.message)
      return { success: false, error: error.message }
    }

    return { success: false, error: 'Erro desconhecido' }
  }
}
