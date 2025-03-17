import type { PartialCompleted, Status } from '@/types'
import { ButtonStatusObra } from './button-status-obra'
import { OptionsTask } from '../buttons/options-task'

export async function SetStatus({
  id,
  clientId,
}: { id: string; clientId: string }) {
  console.log(id)
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
    <div className="flex gap-2">
      <ButtonStatusObra clientId={clientId} id={id} status={status} />
      <OptionsTask taskId={id} />
    </div>
  )
}
