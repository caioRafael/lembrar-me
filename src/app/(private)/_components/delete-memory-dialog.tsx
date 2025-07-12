'use client'

import { Button } from '@/components/ui/button'
import { fetchClient } from '@/services/fetch/client'
import { Trash2 } from 'lucide-react'
import { useModals } from '../context/modal-context'
import { Memory } from '@/interfaces/memory'
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

interface DeleteMemoryAlertDialogProps {
  title: string
  memoryId: string
}

export function DeleteMemoryDialog({
  title,
  memoryId,
}: DeleteMemoryAlertDialogProps) {
  const { memories, setMemories } = useModals()
  const handleDeleteMemory = async () => {
    try {
      const filteredMemory = memories.filter((memory) => memory.id !== memoryId)
      setMemories(filteredMemory as Memory[])
      await fetchClient(`/memory/${memoryId}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.log('erro: ', error)
    }
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
          <AlertDialogAction onClick={handleDeleteMemory}>
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
