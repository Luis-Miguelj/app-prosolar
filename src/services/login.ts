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

      const cookie = cookies().set('token', data.token, {
        httpOnly: true,
        maxAge: 5 * 86400,
      })

      if (cookie) {
        console.log('Usuário criado com sucesso')
        return { tokenSuccess: true }
      }
    } catch (err) {
      return { tokenSuccess: false }
      // return { token: 'Erro ao efetuar o login.' }
    }
  })
