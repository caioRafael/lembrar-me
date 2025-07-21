import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function fetchServer(input: RequestInfo, init?: RequestInit) {
  const accessTokenCookieKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY!
  const cookieStore = await cookies()

  const token = cookieStore.get(accessTokenCookieKey)?.value

  const doFetch = async (accessToken: string) => {
    return await fetch(
      `https://5rbsvddyt8.execute-api.us-east-1.amazonaws.com/dev${input}`,
      {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }

  const response = await doFetch(token as string)

  if (response.status === 401) {
    // const refreshResponse = await fetch(`${baseUrl}/api/spotify/refresh`, {
    //   method: 'POST',
    //   credentials: 'include',
    // })

    // if (!refreshResponse.ok) {
    //   console.error('Erro ao renovar token via /api/spotify/refresh')
    //   return response
    // }

    // const data = await refreshResponse.json()
    // const newAccessToken = data.accessToken

    // if (!newAccessToken) {
    //   console.error('Novo token de acesso não recebido')
    //   return response
    // }

    // response = await doFetch(newAccessToken)

    redirect('/sign-in')
  }

  return response.json()
}
