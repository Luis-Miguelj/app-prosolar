import { DrawerClose } from '@/components/ui/drawer'
import { logout } from '@/functions/logout'
import type { FormEvent } from 'react'

import { useServerAction } from 'zsa-react'

export function Logout() {
  const { execute } = useServerAction(logout)

  async function handleLogout(e: FormEvent) {
    e.preventDefault()
    await execute()

    window.location.reload()
  }

  return (
    <DrawerClose
      type="submit"
      className="py-2 px-6 bg-blue-500 text-white rounded-md"
      onClick={handleLogout}
    >
      Sair
    </DrawerClose>
  )
}
