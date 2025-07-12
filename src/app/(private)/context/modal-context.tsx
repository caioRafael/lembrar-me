'use client'

import { Memory } from '@/interfaces/memory'
import { fetchClient } from '@/services/fetch/client'
import {
  createContext,
  ReactNode,
  RefObject,
  use,
  useEffect,
  useRef,
  useState,
} from 'react'

interface ModalContextType {
  currentMemory: Memory | null
  setCurrentMemory: (memory: Memory | null) => void
  createMemoryModalRef: RefObject<HTMLButtonElement | null>
  memories: Memory[]
  setMemories: (values: Memory[]) => void
}

interface ModalProviderProps {
  children: ReactNode
}

const ModalContext = createContext<ModalContextType>({} as ModalContextType)

export function ModalProvider({ children }: ModalProviderProps) {
  const createMemoryModalRef = useRef<HTMLButtonElement>(null)
  const [currentMemory, setCurrentMemory] = useState<Memory | null>(null)
  const [memories, setMemories] = useState<Memory[]>([])
  useEffect(() => {
    fetchClient('/memory', {
      method: 'GET',
    }).then((response) => {
      console.log('teste: ', response)
      if (!response) return
      setMemories(response as Memory[])
    })
  }, [currentMemory])
  return (
    <ModalContext.Provider
      value={{
        createMemoryModalRef,
        memories,
        setMemories,
        currentMemory,
        setCurrentMemory,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModals = () => {
  const context = use(ModalContext)

  if (!context) {
    throw new Error('Contexto de modal não encontrado')
  }

  return context
}
