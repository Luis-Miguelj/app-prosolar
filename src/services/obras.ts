'use server'

import { createServerAction } from 'zsa'
import { z } from 'zod'
import { revalidateTag } from 'next/cache'

export const obras = createServerAction()
  .input(
    z.object({
      url: z.string().url(),
    })
  )
  .handler(async ({ input }) => {
    console.log(input.url)
    const response = await fetch(input.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!data) {
      return data.error
    }

    revalidateTag('obras')
    console.log(data)
    return 'ok'
  })
