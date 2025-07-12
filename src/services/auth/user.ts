import {
  CognitoIdentityProviderClient,
  GetUserCommand,
  GetUserCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider'
import { ServiceException } from '@aws-sdk/smithy-client'

const REGION = process.env.COGNITO_REGION!
const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY!

const client = new CognitoIdentityProviderClient({ region: REGION })

export type CognitoUserAttributes = {
  [key: string]: string
}

export type GetUserResponse =
  | {
      success: true
      username: string
      attributes: CognitoUserAttributes
    }
  | {
      success: false
      error: string
    }

/**
 * Busca o access token do localStorage com base na env KEY.
 */
function getAccessTokenFromStorage(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

/**
 * Consulta o usuário autenticado usando o access token armazenado.
 */
export async function getUserFromLocalStorage(): Promise<GetUserResponse> {
  const accessToken = getAccessTokenFromStorage()

  if (!accessToken) {
    return {
      success: false,
      error: 'Token de acesso não encontrado no localStorage',
    }
  }

  return await getUserByAccessToken(accessToken)
}

/**
 * Consulta o Cognito diretamente com um access token informado.
 */
export async function getUserByAccessToken(
  accessToken: string,
): Promise<GetUserResponse> {
  const command = new GetUserCommand({ AccessToken: accessToken })

  try {
    const response: GetUserCommandOutput = await client.send(command)

    const attributes = (
      response.UserAttributes || []
    ).reduce<CognitoUserAttributes>((acc, attr) => {
      if (attr.Name && attr.Value) {
        acc[attr.Name] = attr.Value
      }
      return acc
    }, {})

    return {
      success: true,
      username: response.Username as string,
      attributes,
    }
  } catch (error: unknown) {
    if (error instanceof ServiceException) {
      return { success: false, error: error.message }
    }

    return {
      success: false,
      error: 'Erro desconhecido ao buscar dados do usuário',
    }
  }
}
