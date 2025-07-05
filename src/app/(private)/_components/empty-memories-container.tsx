'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Plus } from 'lucide-react'
import { useModals } from '../context/modal-context'

export function EmptyMemoriesContainer() {
  const { createMemoryModalRef } = useModals()
  return (
    <Card className="card-shadow text-center py-16">
      <CardContent>
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-dark-title mb-3">
          Suas primeiras lembranças começam aqui
        </h3>
        <p className="text-description mb-8 max-w-md mx-auto">
          Comece salvando uma experiência que você poderá de repetir no futuro
        </p>
        <Button
          onClick={() => {
            createMemoryModalRef.current?.click()
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white border-0 font-semibold px-8 py-3"
        >
          <Plus className="w-5 h-5 mr-2" />
          Criar Primeira Lembrança
        </Button>
      </CardContent>
    </Card>
  )
}
