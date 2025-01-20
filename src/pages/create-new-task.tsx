'use client'

import { useServerAction } from 'zsa-react'
import { createTasks } from '@/services/create-tasks'

import type { FormEvent } from 'react'

import { useRouter } from 'next/navigation'
import type { Client } from '@/types'

export function CreateNewTask({ client }: { client: Client }) {
  const { execute, data, error, isSuccess } = useServerAction(createTasks)
  const routes = useRouter()

  async function createTask(event: FormEvent) {
    event.preventDefault()
    const form = event.currentTarget as EventTarget & HTMLFormElement
    const formData = new FormData(form)
    const [data, err] = await execute(formData, { clientId: client.id })

    if (err) {
      console.log('Erro ao criar tarefa', err)
      return
    }

    form.reset()
    routes.push(`/services/${client.id}`)
  }

  return (
    <form className="p-5 flex flex-col gap-3" onSubmit={createTask}>
      <div className="flex flex-col gap-2">
        <span className="font-medium text-lg">Descrição:</span>
        <textarea
          name="description"
          placeholder="Descrição"
          className="p-2 rounded bg-white border border-zinc-500 shadow h-32"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium text-lg">Tipo:</span>
        <select
          name="types"
          className="p-2 rounded bg-white border font-medium border-zinc-500 shadow"
        >
          <option value="i">Instalação</option>
          <option value="o">O&M</option>
          <option value="m">Manutenção</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium text-lg">Observação:</span>
        <textarea
          name="obs"
          placeholder="Observações"
          className="p-2 rounded bg-white border border-zinc-500 shadow h-32"
        />
      </div>
      <button
        type="submit"
        className="p-3 rounded-md text-white bg-blue-950 font-medium border border-blue-900 hover:bg-blue-800 transition-all"
      >
        Criar tarefa
      </button>
    </form>
  )
}
