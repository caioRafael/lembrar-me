'use server'

import { confirmSignUp } from '@/services/auth/cognito'
import { ServiceException } from '@aws-sdk/smithy-client'

export async function confirmationAccount(email: string, code: string) {
  try {
    const res = await confirmSignUp(email, code)
    return {
      success: true,
      message: 'Conta confirmada com sucesso!.',
      data: res,
    }
  } catch (error: unknown) {
    if (error instanceof ServiceException) {
      console.error('Erro Cognito:', error.name, error.message)
      return { success: false, error: error.message }
    }

    return { success: false, error: 'Erro desconhecido' }
  }
}
