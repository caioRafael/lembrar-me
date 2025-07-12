'use server'

import { signIn } from '@/services/auth/cognito'
import { ServiceException } from '@aws-sdk/smithy-client'
import { cookies } from 'next/headers'

interface SignInProps {
  email: string
  password: string
}

export async function signInFunction(data: SignInProps) {
  const cookieStory = await cookies()
  const accessTokenKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY!
  const refreshTokenKey = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY!
  try {
    const res = await signIn(data.email, data.password)
    if (res) {
      cookieStory.set(
        accessTokenKey,
        res.AuthenticationResult?.AccessToken as string,
        {
          maxAge: res.AuthenticationResult?.ExpiresIn,
        },
      )
      cookieStory.set(
        refreshTokenKey,
        res.AuthenticationResult?.RefreshToken as string,
      )
    }
    return { success: true, message: 'Sucesso ao realizar o login.', data: res }
  } catch (error: unknown) {
    if (error instanceof ServiceException) {
      console.error('Erro Cognito:', error.name, error.message)
      return { success: false, error: error.message }
    }

    return { success: false, error: 'Erro desconhecido' }
  }
}
