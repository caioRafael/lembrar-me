'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { handleSignOut } from '../actions/handle-signout'

export function SignOutButton() {
  const router = useRouter()

  const signout = async () => {
    handleSignOut()
    router.refresh()
  }

  return (
    <Button
      variant="outline"
      onClick={signout}
      size="sm"
      className="border-soft-blue text-description hover:bg-primary-blue hover:text-white hover:border-primary-blue bg-transparent"
    >
      Sair
    </Button>
  )
}
