import { BookOpen } from 'lucide-react'
import { ReactNode } from 'react'
import { ModalProvider } from './context/modal-context'
import { NewMemoryFunction } from './_components/new-memory-modal'
import { getCurrentUser } from '@/services/auth/user'
import { SignOutButton } from './_components/sign-out-button'

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const { user } = await getCurrentUser()
  console.log(user)
  return (
    <ModalProvider>
      <div className="min-h-screen bg-main-background">
        <header className="bg-white card-shadow sticky top-0 z-40 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-dark-title">
                    lembrar-me
                  </h1>
                  <p className="text-xs text-description">
                    Suas memórias importantes
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <NewMemoryFunction />
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-dark-title">
                      {user?.UserAttributes.name}
                    </p>
                    <p className="text-xs text-description">
                      {user?.UserAttributes.email}
                    </p>
                  </div>
                  <SignOutButton />
                </div>
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
    </ModalProvider>
  )
}
