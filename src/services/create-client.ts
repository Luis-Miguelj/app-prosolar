'use server'
import { z } from 'zod'
import { createServerAction } from 'zsa'
import { revalidateTag } from 'next/cache'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'

export const createClient = createServerAction()
  .input(
    z.object({
      name: z.string().min(3, {
        message: 'O nome deve ter no mínimo 3 caracteres',
      }),
      city: z.string().min(3, {
        message: 'A cidade deve ter no mínimo 3 caracteres',
      }),
    }),
    {
      type: 'formData',
    }
  )
  .output(
    z.object({
      status: z.string(),
      userId: z.string().uuid(),
    })
  )
  .handler(async ({ input }) => {
    try {
      const userId = cookies().get('_')?.value

      if (!userId) {
        return {
          status: 'error',
          userId: '',
        }
      }

      const response = await fetch('http://localhost:3005/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: input.name,
          city: input.city,
          status: 'a',
          completed: false,
          userId,
        }),
      })
      const data = await response.json()

      // console.log(data)
      revalidateTag('clients')
      console.log('Cliente criado com sucesso')
      return {
        status: 'ok',
        userId: data.client.id,
      }
    } catch (err) {
      console.error('Erro ao criar cliente', err)
      return {
        status: 'error',
        userId: '',
      }
    }
  })
