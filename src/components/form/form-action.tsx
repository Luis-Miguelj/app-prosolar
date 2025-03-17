'use client'

import { Alert } from '../alert'

import { useServerAction } from 'zsa-react'
import { createClient } from '@/services/create-client'
import type { FormEvent } from 'react'

export function FormAction() {
  const { isSuccess, execute, data, error } = useServerAction(createClient)

  async function createClientAction(event: FormEvent) {
    event.preventDefault()
    const form = event.currentTarget as EventTarget & HTMLFormElement
    const formData = new FormData(form)
    const [data, err] = await execute(formData)

    if (err) {
      console.log('Erro ao criar cliente', err)
      return
    }
    form.reset()
  }

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Crie um novo cliente</h1>
      <form onSubmit={createClientAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-medium">Nome:</h1>
          <input
            type="text"
            name="name"
            className="p-1.5 rounded bg-white shadow border border-zinc-900 placeholder:text-zinc-500"
            placeholder="Nome"
            required
          />
          {error?.fieldErrors?.name && (
            <span className="text-red-500">{error.fieldErrors.name}</span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="font-medium">Cidade:</h1>
          <input
            type="text"
            name="city"
            className="p-1.5 rounded bg-white shadow border border-zinc-900 placeholder:text-zinc-500"
            placeholder="Cidade"
            required
          />
          {error?.fieldErrors?.city && (
            <span className="text-red-500">{error.fieldErrors.city}</span>
          )}
        </div>
        <button
          type="submit"
          className="font-medium text-white bg-blue-950 border border-zinc-700 p-2 rounded hover:bg-blue-700 transition-all"
        >
          Cadastrar cliente
        </button>
      </form>
      <Alert dialog={isSuccess} id={data?.userId as string} />
    </div>
  )
}
