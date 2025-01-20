'use client'
import { completedTask } from '@/services/completed-task'
import { obras } from '@/services/obras'
import type { Status } from '@/types'
import { useEffect, useState, type FormEvent } from 'react'
import { useServerAction } from 'zsa-react'

type ButtonStatusObraProps = {
  id: string
  clientId: string
  status: Status
}

export function ButtonStatusObra({
  id,
  clientId,
  status,
}: ButtonStatusObraProps) {
  const [url, setUrl] = useState<string>('')
  const [statusType, setStatusType] = useState<string>('')

  const { execute: executeObra, data, error } = useServerAction(obras)
  const { execute: executeCompletedTask } = useServerAction(completedTask)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    await executeObra({ url })

    if (data) {
      console.log('okk')
    }

    if (error) {
      console.log('error')
      console.log(error)
      alert(error)
    }
  }

  async function handleStatus() {
    if (!status.obra.inicioDeObra.inicio) {
      setUrl(`http://localhost:3005/obras/start/${id}`)
      return 'Iniciar obra'
    }

    if (!status.obra.inicioDeObra.fim) {
      setUrl(`http://localhost:3005/obra/update/${status.obra.inicioDeObra.id}`)
      return 'Chegada no cliente'
    }

    if (!status.obra.fimDeObra.inicio) {
      setUrl(`http://localhost:3005/obras/end/${id}`)
      return 'Saindo do cliente'
    }

    if (!status.obra.fimDeObra.fim) {
      setUrl(`http://localhost:3005/obra/update/${status.obra.fimDeObra.id}`)

      return 'Finalizar obra'
    }

    return 'Finalizado'
  }

  useEffect(() => {
    handleStatus().then(data => setStatusType(data))
  })

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className={`text-zinc-950 bg-white ${statusType !== 'Finalizado' && 'hover:bg-zinc-200'} transition-all w-full border p-2 rounded-md`}
        {...(statusType === 'Finalizado' && { disabled: true })}
        onClick={() =>
          executeCompletedTask({ status: statusType, id, clientId })
        }
      >
        {statusType}
      </button>
    </form>
  )
}
