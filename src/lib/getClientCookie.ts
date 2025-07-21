export const getClientCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  const allCookies = document.cookie.split('; ')

  for (const cookie of allCookies) {
    const [cookieName, cookieValue] = cookie.split('=')
    if (cookieName === name) {
      return cookieValue
    }
  }
  console.log('name cookie: ', name)

  return null
}

export function setCookie(name: string, value: string, expires?: number) {
  document.cookie = `${name}=${value}; expires=${expires}; path=/`
}
