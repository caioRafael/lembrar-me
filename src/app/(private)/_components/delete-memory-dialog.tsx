'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { deleteMemory } from '../actions/delete-memory'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface DeleteMemoryAlertDialogProps {
  title: string
  memoryId: string
}

export function DeleteMemoryDialog({
  title,
  memoryId,
}: DeleteMemoryAlertDialogProps) {
  const router = useRouter()
  const [isPending, startTransiction] = useTransition()
  const handleDeleteMemory = async () => {
    startTransiction(async () => {
      try {
        await deleteMemory(memoryId)
        router.refresh()
      } catch (error) {
        console.log('erro: ', error)
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir essa memoria?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar você excluirá a memoria {title}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteMemory} disabled={isPending}>
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
