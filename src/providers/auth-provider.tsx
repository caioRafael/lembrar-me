// contexts/AuthContext.tsx
'use client'

import { createContext, use, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getClientCookie } from '@/lib/getClientCookie'

type AuthContextType = {
  isAuthenticated: boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  logout: () => {},
})

const PUBLIC_ROUTES = ['/', '/sign-in', '/register', '/register/confirmation']

const ACCESS_TOKEN_KEY =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access-token'
const REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh-token'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const accessToken = getClientCookie(ACCESS_TOKEN_KEY)

    if (accessToken) {
      setIsAuthenticated(true)
      router.push('/dashboard')
    } else {
      setIsAuthenticated(false)
      const isPublic = PUBLIC_ROUTES.includes(pathname)
      if (!isPublic) {
        router.replace('/sign-in')
      }
    }
  }, [pathname])

  const logout = () => {
    document.cookie = `${ACCESS_TOKEN_KEY}=; Max-Age=0; path=/`
    document.cookie = `${REFRESH_TOKEN_KEY}=; Max-Age=0; path=/`
    setIsAuthenticated(false)
    router.push('/sign-in')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = use(AuthContext)

  if (!context) {
    throw new Error('Contexto nõa encontrado!')
  }

  return context
}
