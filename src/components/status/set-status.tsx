import type { Status } from '@/types'
import { ButtonStatusObra } from './button-status-obra'

export async function SetStatus({
  id,
  clientId,
}: { id: string; clientId: string }) {
  const response = await fetch(`http://localhost:3005/obra/status/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['obras'],
      revalidate: false,
    },
  })

  const status: Status = await response.json()

  return (
    <div>
      <ButtonStatusObra clientId={clientId} id={id} status={status} />
    </div>
  )
}
