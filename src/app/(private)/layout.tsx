import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import { ReactNode } from 'react'
import { ModalProvider } from './context/modal-context'
import { NewMemoryFunction } from './_components/new-memory-modal'

interface PrivateLayoutProps {
  children: ReactNode
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
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
                      Caio Rafael
                    </p>
                    <p className="text-xs text-description">
                      caiorafaelrg@gmail.com
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    // onClick={logout}
                    size="sm"
                    className="border-soft-blue text-description hover:bg-primary-blue hover:text-white hover:border-primary-blue bg-transparent"
                  >
                    Sair
                  </Button>
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
