'use server'
import { createServerAction } from 'zsa'
import { z } from 'zod'
import axios from 'axios'
import { revalidateTag } from 'next/cache'

export const editClient = createServerAction()
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
      city: z.string(),
      status: z.string(),
    })
  )
  .handler(async ({ input }) => {
    if (input.status === 'c') {
      try {
        const response = await axios.put(
          `http://localhost:3005/client/${input.id}`,
          {
            name: input.name,
            city: input.city,
            status: 'c',
            completed: true,
          }
        )

        revalidateTag('clients')
        return response.data
      } catch (err) {
        return new Error(err as string)
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:3005/client/${input.id}`,
        {
          name: input.name,
          city: input.city,
          status: input.status,
          completed: false,
        }
      )

      const data = response.data

      if (data) {
        revalidateTag('clients')
        return data
      }
    } catch (err) {
      return new Error(err as string)
    }
  })
