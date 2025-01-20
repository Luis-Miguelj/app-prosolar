'use server'
import { createServerAction } from 'zsa'
import { z } from 'zod'
import axios from 'axios'
import { revalidateTag } from 'next/cache'

export const updateTask = createServerAction()
  .input(
    z.object({
      id: z.string().uuid(),
      clientId: z.string().uuid(),
      status: z.string(),
      updatedAt: z.date(),
      obs: z.string(),
      description: z.string(),
      type: z.string(),
    })
  )
  .handler(async ({ input }) => {
    try {
      console.log({ ...input })
      const response = await axios.put(
        `http://localhost:3005/update-task/${input.id}`,
        {
          clientId: input.clientId,
          description: input.description,
          obs: input.obs,
          status: input.status,
          types: input.type,
          updatedAt: input.updatedAt,
        }
      )

      const data = await response.data

      if (data) {
        revalidateTag('obras')
      }

      console.log(data)
    } catch (err) {
      console.error(err)
      return {
        edit: new Error(err as string),
      }
    }
  })
