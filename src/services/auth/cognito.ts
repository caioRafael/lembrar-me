import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { createHmac } from 'crypto'

const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION!
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID!

export const client = new CognitoIdentityProviderClient({ region: REGION })

export function generateSecretHash(
  username: string,
  clientId: string,
  clientSecret: string,
): string {
  return createHmac('sha256', clientSecret)
    .update(username + clientId)
    .digest('base64')
}

export async function signUp(email: string, password: string, name: string) {
  const secretHash = generateSecretHash(
    email,
    process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID!,
    process.env.COGNITO_USER_POOL_CLIENT_SECRET!,
  )
  console.log('entrou')
  const command = new SignUpCommand({
    ClientId: CLIENT_ID,
    Username: email,
    Password: password,
    SecretHash: secretHash,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'name', Value: name },
    ],
  })

  console.log('teste: ', command)
  return await client.send(command)
}

export async function confirmSignUp(email: string, confirmationCode: string) {
  const CLIENT_SECRET = process.env.COGNITO_USER_POOL_CLIENT_SECRET!

  const secretHash = generateSecretHash(email, CLIENT_ID, CLIENT_SECRET)

  const command = new ConfirmSignUpCommand({
    ClientId: CLIENT_ID,
    Username: email,
    ConfirmationCode: confirmationCode,
    SecretHash: secretHash,
  })

  console.log('confirm account: ', command)

  const response = await client.send(command)
  return { success: true, response }
}

export async function signIn(email: string, password: string) {
  const CLIENT_SECRET = process.env.COGNITO_USER_POOL_CLIENT_SECRET!

  const secretHash = generateSecretHash(email, CLIENT_ID, CLIENT_SECRET)
  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  })

  return await client.send(command)
}
