'use client'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CloudUpload } from 'lucide-react'
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/extension/file-upload'
import { TagsInput } from '@/components/ui/extension/tags-input'
import Image from 'next/image'
import { Memory } from '@/interfaces/memory'
import { useRouter } from 'next/navigation'
import { useModals } from '../context/modal-context'
import { createMemory } from '../actions/create-memory'
import { updateMemory } from '../actions/update-memory'
import { filesToBase64 } from '@/lib/convertToBase64'

interface CreateMemoryFormProps {
  action?: () => void
}

const formSchema = z.object({
  title: z.string().min(1).min(3).max(40),
  description: z.string().min(10).max(3000),
  tags: z.array(z.string()).min(1, 'Por favor adicione pelo menos 1 tag'),
  file: z.string().optional(),
})

export default function CreateMemoryForm({ action }: CreateMemoryFormProps) {
  const [isPending, startTransiction] = useTransition()
  const [files, setFiles] = useState<File[] | null>(null)
  const { setCurrentMemory, currentMemory } = useModals()
  const route = useRouter()

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentMemory || {
      title: '',
      description: '',
      tags: ['Lembrança'],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransiction(async () => {
      try {
        const images = await filesToBase64(files as File[])
        console.log({ ...values, images })

        if (currentMemory) {
          await updateMemory(currentMemory.id as string, values as Memory)
        } else {
          await createMemory({ ...values, images } as Memory)
        }
        toast(
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>,
        )

        if (action) {
          action()
        }
        setCurrentMemory(null)
        route.refresh()
      } catch (error) {
        console.error('Form submission error', error)
        toast.error('Failed to submit the form. Please try again.')
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="Titulo" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Dê uma descrição sobre o que você deseja lembrar;"
                  className="resize-none max-h-96"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Dê uma descrição sobre o que você deseja lembrar
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tags"
                />
              </FormControl>
              <FormDescription>Adicione tags a suas lembranças</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent className="flex flex-row flex-wrap">
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem
                          key={i}
                          index={i}
                          className="size-20 p-0 rounded-md overflow-hidden"
                          aria-roledescription={`file ${i + 1} containing ${file.name}`}
                        >
                          {/* <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span> */}
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            height={80}
                            width={80}
                            className="size-20 p-0"
                          />
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>Selecione imagens para o upload</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Salvar
        </Button>
      </form>
    </Form>
  )
}
