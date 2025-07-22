import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Brain } from 'lucide-react'
import Link from 'next/link'
import ConfirmationForm from './_components/confirmation-form'

export default function ConfirmationAccountPage() {
  return (
    <div className="space-y-4 flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-5xl text-blue-500 font-bold flex items-center gap-2">
        <Brain size={50} /> Lembrar-me
      </h1>
      <Card className="flex flex-col w-96 ">
        <CardHeader>
          <CardTitle>Confirme sua conta</CardTitle>
          <CardDescription>
            Realize seu cadastro para poder guardar suas lembranças
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConfirmationForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Ja tem cadastro?{' '}
            <Link
              href={'/sign-in'}
              className="text-blue-500 hover:underline hover:text-blue-600 transition-all"
            >
              Realize seu login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
