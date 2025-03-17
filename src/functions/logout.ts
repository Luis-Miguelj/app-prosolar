'use server'
import { createServerAction } from 'zsa'
import { cookies } from 'next/headers'

export const logout = createServerAction().handler(async () => {
  const token = cookies().get('token')?.value
  const userId = cookies().get('_')?.value

  if (userId) {
    cookies().delete('_')
  }

  if (token) {
    cookies().delete('token')
  }
})
