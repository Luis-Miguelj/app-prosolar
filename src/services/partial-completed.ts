import { createServerAction } from 'zsa'
import { partialCompletedSchema } from '@/types/zod-types'

export const partialCompleted = createServerAction()
  .input(partialCompletedSchema)
  .handler(async ({ input }) => {
    const { id, obs, fim, inicio } = input

    try {
      const response = await fetch(
        `http://localhost:3005/obras/partial-completed/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskId: id,
            obs,
            inicio,
          }),
        }
      )

      const data = await response.json()

      if (data) {
        console.log(data)
        return data
      }
    } catch (err) {
      console.error('Erro ao finalizar tarefa', err)
      return {
        error: 'Erro ao finalizar parcialmente tarefa',
        description: err,
      }
    }
  })
