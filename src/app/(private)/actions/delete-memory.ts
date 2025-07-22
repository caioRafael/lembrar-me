'use server'

import { fetchServer } from '@/services/fetch/server'

export async function deleteMemory(memoryId: string) {
  try {
    await fetchServer(`/memory/${memoryId}`, {
      method: 'DELETE',
    })
    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar uma memoria:', error)
    return { success: false, error }
  }
}
