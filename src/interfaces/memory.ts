export interface Memory {
  id?: string
  date?: Date
  title: string
  description: string
  tags: string[]
  files: File[] | string[] | null
  images?: string[]
}

export interface ExtendedFile extends File {
  path: string
  relativePath: string
}
