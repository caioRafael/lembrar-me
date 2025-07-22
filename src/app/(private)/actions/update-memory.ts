'use server'

import { Memory } from '@/interfaces/memory'
import { fetchServer } from '@/services/fetch/server'

export async function updateMemory(id: string, memory: Memory) {
  try {
    const response = await fetchServer(`/memory/${id}`, {
      method: 'put',
      body: JSON.stringify(memory),
    })

    return { success: true, data: response }
  } catch (error) {
    console.error('Erro ao atualizar a memoria:', error)
    return { success: false, error }
  }
}
