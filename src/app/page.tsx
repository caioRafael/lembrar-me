import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen gap-4">
      <h1>olá mundo</h1>
      <Button asChild>
        <Link href={'/sign-in'}>Login</Link>
      </Button>
      <Button asChild>
        <Link href={'/register'}>Cadastro</Link>
      </Button>
    </div>
  )
}
