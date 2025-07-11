import { Brain } from 'lucide-react'
import SignInForm from './_components/signin-form'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="space-y-4 flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-5xl text-blue-500 font-bold flex items-center gap-2">
        <Brain size={50} /> Lembrar-me
      </h1>
      <Card className="flex flex-col w-96 ">
        <CardHeader>
          <CardTitle>Realize o seu Login</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Não tem cadastro?{' '}
            <Link
              href={'/register'}
              className="text-blue-500 hover:underline hover:text-blue-600 transition-all"
            >
              Crie sua conta
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
