'use server'
import { z } from 'zod'
import { createServerAction } from 'zsa'
import { cookies } from 'next/headers'

export const login = createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
  )
  .output(
    z.object({
      tokenSuccess: z.boolean().optional(),
      error: z.string().optional(),
    })
  )
  .onError(error => {
    console.log('Error: ', error)
  })
  .handler(async ({ input }) => {
    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      })
      const data = await response.json()

      if (data.error) {
        console.log(data.error)
        return { tokenSuccess: false, error: data.error }
      }

      const cookieId = cookies().set('_', data.userId, {
        httpOnly: true,
        maxAge: 5 * 86400,
      })

      const cookie = cookies().set('token', data.token, {
        httpOnly: true,
        maxAge: 5 * 86400,
      })

      if (cookie && cookieId) {
        console.log('Usuário logado com sucesso')
        return { tokenSuccess: true }
      }
    } catch (err) {
      return { tokenSuccess: false }
    }

    return { tokenSuccess: false, error: 'Algo deu errado' }
  })
