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
