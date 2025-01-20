'use server'
import { createServerAction } from 'zsa'
import { z } from 'zod'

export const completedTask = createServerAction()
  .input(
    z.object({
      status: z.string(),
      id: z.string(),
      clientId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const { clientId, id, status } = input

    if (status === 'Finalizar obra') {
      try {
        const response = await fetch(
          `http://localhost:3005/update-task/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              completed: true,
              clientId: clientId,
            }),
          }
        )

        const data = await response.json()

        console.log(data)
      } catch (e) {
        console.error(e)
      }
    }
  })
