'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Memory } from '@/interfaces/memory'
import { DeleteMemory } from '@/services/memories'
import { Calendar, Edit, Eye, Trash2 } from 'lucide-react'
import { useModals } from '../context/modal-context'
import Link from 'next/link'

interface MemoryCardProps {
  memory: Memory
}

export function MemoryCard({ memory }: MemoryCardProps) {
  const { setMemories } = useModals()
  const handleDeleteMemory = async () => {
    const memories = await DeleteMemory(memory.id as string)
    setMemories(memories)
  }
  return (
    <Card className="card-shadow flex-1 hover:card-shadow-hover transition-all duration-200 group">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            {memory.date && (
              <div className="flex items-center text-sm text-description">
                <Calendar className="h-4 w-4 mr-1" />
                {/* {format(memory.date, 'dd/MM/yyyy', { locale: ptBR })} */}
                {new Date(memory.date).toLocaleDateString()}
              </div>
            )}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              //   onClick={() => handleEdit(memory)}
              className="h-8 w-8 p-0 hover:bg-blue-500 hover:text-white"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteMemory}
              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardTitle className="text-lg font-bold text-dark-title mb-3 line-clamp-2 leading-tight">
          {memory.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-description mb-4 line-clamp-3 leading-relaxed">
          {memory.description}
        </p>

        {memory.files && memory.files.length > 0 ? (
          <div className="mb-4">
            <div className="text-sm text-description mb-2">
              {memory.files.length} arquivo(s) anexado(s)
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <div className="text-sm text-description mb-2">
              Nenhum arquivo anexado
            </div>
          </div>
        )}

        {memory.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {memory.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                className="bg-lavender text-dark-title border-0 font-medium px-2 py-1 text-xs"
              >
                {tag}
              </Badge>
            ))}
            {memory.tags.length > 3 && (
              <Badge className="text-description border-0 font-medium px-2 py-1 text-xs">
                +{memory.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            asChild
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white border-0 font-semibold"
          >
            <Link href={`/memory/${memory.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              Ver Detalhes
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
