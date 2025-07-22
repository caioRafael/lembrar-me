'use server'

import { Memory } from '@/interfaces/memory'
import { fetchServer } from '@/services/fetch/server'

export async function createMemory(memory: Memory) {
  try {
    const response = await fetchServer('/memory', {
      method: 'post',
      body: JSON.stringify(memory),
    })

    return { success: true, data: response }
  } catch (error) {
    console.error('Erro cadastrar uma memoria:', error)
    return { success: false, error }
  }
}
