'use server'
import { z } from 'zod'
import { createServerAction } from 'zsa'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'

export const cadastro = createServerAction()
  .input(
    z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    })
  )
  .handler(async ({ input }) => {
    try {
      const response = await fetch('http://localhost:3333/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          password: input.password,
        }),
      })
      const data = await response.json()

      const cookieId = cookies().set('_', data.userId, {
        httpOnly: true,
        maxAge: 5 * 86400,
      })

      const cookie = cookies().set('token', data.token, {
        httpOnly: true,
        maxAge: 5 * 86400,
      })

      if (cookie && cookieId) {
        console.log('Usuário criado com sucesso')
        return { tokenSuccess: true }
      }

      // return { token: data.token }
    } catch (err) {
      // return { token: 'Erro ao efetuar o login.' }
      console.log('Erro ao criar usuário', err)
      return { tokenSuccess: false }
    }
  })
