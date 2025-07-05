import { MemoryContainer } from './_components/memory-container'

interface MemoryPageProps {
  params: Promise<{
    memoryId: string
  }>
}

export default async function MemoryPage({ params }: MemoryPageProps) {
  const { memoryId } = await params
  return (
    <div className="w-full max-w-[1000px] mx-auto mt-10">
      <MemoryContainer memoryId={memoryId} />
    </div>
  )
}
