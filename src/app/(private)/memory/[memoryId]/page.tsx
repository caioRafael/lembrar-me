import { MemoryContainer } from './_components/memory-container'

interface MemoryPageProps {
  params: Promise<{
    memoryId: string
  }>
}

export default async function MemoryPage({ params }: MemoryPageProps) {
  const { memoryId } = await params
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <MemoryContainer memoryId={memoryId} />
    </div>
  )
}
