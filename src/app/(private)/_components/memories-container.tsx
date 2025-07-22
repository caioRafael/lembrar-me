import { EmptyMemoriesContainer } from './empty-memories-container'
import { Card, CardContent } from '@/components/ui/card'
import { MemoryCard } from './memory-card'
import { fetchServer } from '@/services/fetch/server'
import { Memory } from '@/interfaces/memory'

export async function MemoriesContainer() {
  const memories: Memory[] = await fetchServer('/memory')
  return (
    <div className="col-span-full">
      {memories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary-blue mb-2">
                {memories.length}
              </div>
              <div className="text-sm font-medium">Lembranças Salvas</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-soft-blue mb-2">
                {memories.filter((a) => a.files).length}
              </div>
              <div className="text-sm font-medium">Com Fotos</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-lavender mb-2">
                {new Set(memories.flatMap((a) => a.tags)).size}
              </div>
              <div className="text-sm font-medium">Tags Únicas</div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <EmptyMemoriesContainer />
      )}
      {memories.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory) => (
            <MemoryCard memory={memory} key={memory.id} />
          ))}
        </div>
      )}
    </div>
  )
}
