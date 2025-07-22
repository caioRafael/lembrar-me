import { GetUserCommand } from '@aws-sdk/client-cognito-identity-provider'
import { cookies } from 'next/headers'
import 'server-only'
import { client } from './cognito'
import {
  CognitoUserAttribute,
  parseUserAttributes,
} from '@/lib/parseUserAttributes'

export async function getCurrentUser() {
  const accessTokenKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY! as string
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(accessTokenKey)?.value

  const command = new GetUserCommand({
    AccessToken: accessToken,
  })

  try {
    if (accessToken) {
      const response = await client.send(command)
      return {
        success: true,
        user: {
          ...response,
          UserAttributes: parseUserAttributes(
            response.UserAttributes as CognitoUserAttribute[],
          ),
        },
      }
    }
    return { success: false }
  } catch (error) {
    console.error('Erro ao buscar usuário logado:', error)
    return { success: false, error }
  }
}
