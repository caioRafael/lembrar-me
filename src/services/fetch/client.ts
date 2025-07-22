import { redirect } from 'next/navigation'

export async function fetchClient<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const accessTokenCookieKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY!
  const token = getCookie(accessTokenCookieKey)

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
    //     const refreshResponse = await fetch(`${baseUrl}/api/spotify/refresh`, {
    //       method: 'POST',
    //       credentials: 'include', // importante para enviar cookies
    //     })

    //     if (!refreshResponse.ok) {
    //       console.error('Erro ao renovar token via /api/spotify/refresh')
    //       return response
    //     }

    //     const data = await refreshResponse.json()
    //     const newAccessToken = data.accessToken

    //     if (!newAccessToken) {
    //       console.error('Novo token de acesso não recebido')
    //       return response
    //     }

    //     setCookie(accessTokenCookieKey, newAccessToken, 1)

    //     response = await doFetch(newAccessToken)
    //   }

    //   return response
    redirect('/sign-in')
  }
  return response.json()
}

function getCookie(name: string): string | null {
  return (
    document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='))
      ?.split('=')[1] ?? null
  )
}
