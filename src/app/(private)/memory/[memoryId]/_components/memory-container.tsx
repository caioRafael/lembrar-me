import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Memory } from '@/interfaces/memory'
import { fetchServer } from '@/services/fetch/server'
import { Calendar, Eye, Tag } from 'lucide-react'

interface MemoryContainerProps {
  memoryId: string
}

export async function MemoryContainer({ memoryId }: MemoryContainerProps) {
  const memory: Memory = await fetchServer(`/memory/${memoryId}`)
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {memory?.title}
          </h1>
          {memory?.date && (
            <div className="flex items-center text-sm text-description">
              <Calendar className="h-4 w-4 mr-1" />
              {/* {format(memory.date, 'dd/MM/yyyy', { locale: ptBR })} */}
              {new Date(memory.date).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="image" disabled={memory?.files?.length === 0}>
            {memory?.files?.length === 0 ? 'Sem Imagem' : 'Imagem'}
          </TabsTrigger>
        </TabsList>

        {/* Aba de Detalhes */}
        <TabsContent value="details" className="mt-6">
          <div className="grid gap-6">
            {/* Descrição */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Descrição / Procedimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {memory?.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {memory?.tags && memory?.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {memory.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-sm px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informações adicionais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">
                      Data de Criação:
                    </span>
                    <p className="text-gray-600">
                      {memory?.date &&
                        new Date(memory.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Aba de Imagem */}
        <TabsContent value="image" className="mt-6">
          {memory?.files && memory.files.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Visualização da Imagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {memory.files.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-auto rounded-lg border cursor-pointer hover:shadow-lg transition-shadow"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">
                  Esta atividade não possui imagem anexa.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
