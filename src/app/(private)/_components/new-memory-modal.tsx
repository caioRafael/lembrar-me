'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useModals } from '../context/modal-context'
import CreateMemoryForm from './create-memory-form'

export function NewMemoryFunction() {
  const { createMemoryModalRef } = useModals()

  const changeModalState = () => {
    createMemoryModalRef.current?.click()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          ref={createMemoryModalRef}
          className="bg-blue-500 hover:bg-blue-600 text-white border-0 font-semibold px-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Lembrança
        </Button>
      </DialogTrigger>
      <DialogContent className="h-1/2 overflow-scroll">
        <DialogHeader>
          <DialogTitle>Nova lembrança</DialogTitle>
          <DialogDescription>
            Cadastre uma nova lembrança, ou atividade que deseja realizar
            futuramente.
          </DialogDescription>
        </DialogHeader>
        <CreateMemoryForm action={changeModalState} />
      </DialogContent>
    </Dialog>
  )
}
