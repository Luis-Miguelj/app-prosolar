'use client'
import { DialogClose } from '@/components/ui/dialog'
import { useServerAction } from 'zsa-react'

import { useState, type FormEvent } from 'react'

import { editClient } from '@/services/edit-client'
import type { ClientProps } from '@/types'
import { validatorStatusClient } from '@/functions/validator'

export function FormEditClient({ id, city, name, status }: ClientProps) {
  const statusValidation = validatorStatusClient(status)
  console.log(statusValidation)

  const [statusValue, setStatusValue] = useState(statusValidation)
  const [nameValue, setNameValue] = useState(name)
  const [cityValue, setCityValue] = useState(city)

  const { execute } = useServerAction(editClient)

  async function editClientHandler(e: FormEvent) {
    e.preventDefault()
    const [data, err] = await execute({
      id,
      name: nameValue,
      city: cityValue,
      status: statusValue,
    })

    console.log('Data: ', data)

    if (err) {
      return alert('Erro ao editar cliente')
    }
  }

  return (
    <form className="w-full flex flex-col gap-5" onSubmit={editClientHandler}>
      <div className="flex flex-col gap-2 w-full">
        <span className="font-medium text-base">Nome:</span>
        <input
          type="text"
          id="name"
          className="p-3 w-full rounded outline-none border border-zinc-200"
          placeholder="Nome"
          value={nameValue}
          onChange={e => setNameValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="font-medium text-base">Cidade:</span>
        <input
          type="text"
          id="city"
          className="p-3 w-full rounded outline-none border border-zinc-200"
          placeholder="Cidade"
          value={cityValue}
          onChange={e => setCityValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="font-medium text-base">Status:</span>
        <select
          name="status"
          className="p-3 rounded bg-white border font-medium border-zinc-300 outline-none"
          value={statusValue}
          onChange={e => setStatusValue(e.target.value)}
        >
          <option value="a">Em andamento</option>
          <option value="c">Completa</option>
          <option value="i">Incompleta</option>
        </select>
      </div>

      <div className="flex justify-center w-full">
        <DialogClose
          type="submit"
          className="p-3 text-center bg-blue-500 w-full text-white rounded-md font-semibold"
        >
          Editar
        </DialogClose>
      </div>
    </form>
  )
}
