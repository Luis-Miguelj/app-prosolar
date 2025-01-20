'use client'
import { IoCreateOutline } from 'react-icons/io5'
import { useServerAction } from 'zsa-react'
import { useState, type FormEvent } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Card, CardContent } from '@/components/ui/card'
import { updateTask } from '@/services/update-task'
import { validatorStatus, validatorType } from '@/functions/validator'

type FormEditionDialogProps = {
  id: string
  clientId: string
  obs?: string
  description: string
  status: string
  type: string
}

export function FormEditionDialog({
  clientId,
  description,
  id,
  obs,
  type,
  status,
}: FormEditionDialogProps) {
  const { execute } = useServerAction(updateTask)

  const statusEdited = validatorStatus(status)
  const typeEdited = validatorType(type)

  const [descriptionEdit, setDescriptionEdit] = useState(description)
  const [obsEdit, setObsEdit] = useState(obs)
  const [typeEdit, setTypeEdit] = useState(typeEdited)
  const [statusEdit, setStatusEdit] = useState(statusEdited)

  async function handleEditTask(e: FormEvent) {
    e.preventDefault()

    const [data, err] = await execute({
      id,
      clientId: clientId,
      description: descriptionEdit as string,
      obs: obsEdit as string,
      status: statusEdit,
      type: typeEdit,
      updatedAt: new Date(),
    })

    console.log('data: ', data)
    console.log('error: ', err)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <IoCreateOutline
          size={24}
          className="text-2xl text-white rounded-md bg-zinc-800"
        />
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-md py-5 px-1">
        <DialogHeader>
          <DialogTitle>Formulario de Edição</DialogTitle>
        </DialogHeader>
        <Card className="border-none">
          <CardContent className="p-2 flex flex-col gap-4">
            <form className="flex flex-col gap-5" onSubmit={handleEditTask}>
              <div className="flex flex-col gap-1.5 w-full">
                <span className="font-medium text-base">Descrição:</span>
                <textarea
                  className="h-28 outline-none border border-zinc-300 rounded-md p-1"
                  placeholder="Descrição"
                  value={descriptionEdit}
                  onChange={e => setDescriptionEdit(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-base">Tipo:</span>
                <select
                  name="types"
                  className="p-2 rounded bg-white border font-medium border-zinc-300 outline-none"
                  value={typeEdit}
                  onChange={e => setTypeEdit(e.target.value)}
                >
                  <option value="i">Instalação</option>
                  <option value="o">O&M</option>
                  <option value="m">Manutenção</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <span className="font-medium text-base">Observação:</span>
                <textarea
                  className="h-28 outline-none border border-zinc-300 rounded-md p-1"
                  placeholder="Descrição"
                  value={obsEdit}
                  onChange={e => setObsEdit(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-base">Status:</span>
                <select
                  name="status"
                  className="p-2 rounded bg-white border font-medium border-zinc-300 outline-none"
                  value={statusEdit}
                  // defaultValue={statusEdit}
                  onChange={e => setStatusEdit(e.target.value)}
                >
                  <option value="a">Em andamento</option>
                  <option value="c">Completa</option>
                  <option value="i">Incompleta</option>
                </select>
              </div>
              <div>
                <DialogClose
                  type="submit"
                  className="p-2 text-center bg-blue-500 w-full text-white rounded-md"
                >
                  Editar
                </DialogClose>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
