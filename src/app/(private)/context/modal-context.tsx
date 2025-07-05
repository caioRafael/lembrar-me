'use client'

import { Memory } from '@/interfaces/memory'
import { GetMemories } from '@/services/memories'
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

  const [memories, setMemories] = useState<Memory[]>([])
  useEffect(() => {
    GetMemories().then((res) => setMemories(res))
  }, [])
  return (
    <ModalContext.Provider
      value={{ createMemoryModalRef, memories, setMemories }}
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
