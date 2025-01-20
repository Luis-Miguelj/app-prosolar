'use server'

import { createServerAction } from 'zsa'
import { z } from 'zod'
import { revalidateTag } from 'next/cache'

export const createTasks = createServerAction()
  .input(
    z.object({
      clientId: z
        .string()
        .uuid({ message: 'O formato do id não coresponde com o esperado' }),
      types: z.string().min(1, { message: 'Esse campo é obrigatório.' }),
      description: z
        .string()
        .min(1, { message: 'Esse campo é obrigatório.' })
        .max(255, { message: 'Esse campo deve ter no máximo 255 caracteres.' }),
      obs: z
        .string()
        .max(255, { message: 'Esse campo deve ter no máximo 255 caracteres.' })
        .optional(),
    }),
    {
      type: 'formData',
    }
  )
  .handler(async ({ input }) => {
    try {
      const response = await fetch('http://localhost:3005/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: input.clientId,
          types: input.types,
          description: input.description,
          status: 'a',
          obs: input.obs,
        }),
      })

      const data = await response.json()

      revalidateTag('tasks')
      console.log('Tarefa criada com sucesso')
      return {
        status: 'ok',
      }
    } catch (err) {
      console.error('Erro ao criar tarefa', err)
    }
  })
