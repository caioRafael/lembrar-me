'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Eye } from 'lucide-react'
import { MemoryContainer } from './memory-container'

interface MemoryModalProps {
  memoryId: string
}

export function MemoryModal({ memoryId }: MemoryModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white border-0 font-semibold">
          <Eye className="w-4 h-4 mr-2" />
          Ver Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes</DialogTitle>
        </DialogHeader>
        <MemoryContainer memoryId={memoryId} />
      </DialogContent>
    </Dialog>
  )
}
