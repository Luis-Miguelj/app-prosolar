import { z } from 'zod'

export const partialCompletedSchema = z.object({
  id: z
    .string()
    .uuid({
      message: 'O formato do id da task não coresponde com o esperado',
    })
    .optional(),
  obs: z
    .string()
    .min(5, { message: 'A observação deve ter no mínimo 5 caracteres' }),
  inicio: z.date().optional(),
  fim: z.date().optional(),
})

export type PartialCompletedTask = z.infer<typeof partialCompletedSchema>
