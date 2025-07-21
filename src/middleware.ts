import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

// const PUBLIC_ROUTES = ['/', '/sign-in', '/register', '/register/confirmation']

const PUBLIC_ROUTES = [
  { path: '/', whenAuthenticated: 'next' },
  { path: '/sign-in', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in'

export function middleware(request: NextRequest) {
  const accessTokenKey =
    (process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY! as string) || 'access-token'

  const path = request.nextUrl.pathname
  const publicRoute = PUBLIC_ROUTES.find((route) => route.path === path)
  const authToken = request.cookies.get(accessTokenKey)

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    return NextResponse.redirect(redirectUrl)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/dashboard'

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
