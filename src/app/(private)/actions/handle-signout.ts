'use server'

import { cookies } from 'next/headers'

export async function handleSignOut() {
  const accessTokenKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY! as string
  const refreshTokenKey = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY! as string
  const cookieStore = await cookies()

  cookieStore.delete(accessTokenKey)
  cookieStore.delete(refreshTokenKey)
}
