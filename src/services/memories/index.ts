'use client'

import { Memory } from '@/interfaces/memory'

export async function CreateMemory(data: Memory) {
  const memoryKey = 'memories'

  const memories = localStorage.getItem(memoryKey)

  const date = new Date()
  date.setHours(0, 0, 0, 0)

  const currentMemories = memories ? JSON.parse(memories) : []

  const memory = JSON.stringify([
    ...currentMemories,
    {
      ...data,
      id: Date.now().toString(),
      date,
    },
  ])

  localStorage.setItem(memoryKey, memory)
}

export async function GetMemories(): Promise<Memory[]> {
  let memoriesString = null
  if (typeof window !== 'undefined') {
    memoriesString = localStorage.getItem('memories')
  }

  const memories: Memory[] = memoriesString ? JSON.parse(memoriesString) : []

  return memories
}

export async function DeleteMemory(id: string) {
  const memoryKey = 'memories'
  const memories = await GetMemories()

  const filteredMemories = memories.filter(
    (memory) => (memory.id as string) !== id,
  )

  const memoriesString = JSON.stringify(filteredMemories)

  localStorage.setItem(memoryKey, memoriesString)

  return filteredMemories
}

export async function GetMemory(id: string): Promise<Memory | null> {
  const memories = await GetMemories()

  const filteredMemories = memories.filter(
    (memory) => (memory.id as string) === id,
  )[0]

  return filteredMemories || null
}
