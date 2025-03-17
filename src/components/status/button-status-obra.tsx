'use client'
import { completedTask } from '@/services/completed-task'
import { obras } from '@/services/obras'
import type { PartialCompleted, Status } from '@/types'
import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useServerAction } from 'zsa-react'

type ButtonStatusObraProps = {
  id: string
  clientId: string
  status: Status
  // partialCompleted: PartialCompleted[]
}

export function ButtonStatusObra({
  id,
  clientId,
  status,
  // partialCompleted,
}: ButtonStatusObraProps) {
  const [url, setUrl] = useState<string>('')
  const [statusType, setStatusType] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [partialCompletedDate, setPartialCompletedDate] =
    useState<PartialCompleted>()

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

  const handleStatus = useCallback(async () => {
    if (!status.obra.inicioDeObra.inicio) {
      setUrl(`http://localhost:3005/obras/start/${id}`)
      return 'Indo ao cliente'
    }

    if (!status.obra.inicioDeObra.fim) {
      setUrl(`http://localhost:3005/obra/update/${status.obra.inicioDeObra.id}`)

      return 'Iniciar obra'
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
  }, [id, status.obra])

  // useEffect(() => {
  //   partialCompleted.map(item => {
  //     setPartialCompletedDate(item)
  //   })
  // }, [partialCompleted])

  useEffect(() => {
    handleStatus().then(data => {
      setStatusType(data)
      setIsLoading(true)
    })
  }, [handleStatus])

  if (!isLoading) {
    return (
      <p className="text-zinc-950 bg-zinc-200 w-full text-center font-semibold text-base p-2 rounded-md">
        Carregando...
      </p>
    )
  }

  if (partialCompletedDate?.inicio && partialCompletedDate?.fim) {
    return (
      <button
        type="button"
        disabled
        className="text-zinc-950 bg-zinc-200 w-full text-base p-2 rounded-md"
      >
        Tarefa parcialmente finalizada
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-60">
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
