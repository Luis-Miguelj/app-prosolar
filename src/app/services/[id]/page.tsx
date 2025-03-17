import { FormEditionDialog } from '@/components/form/form-edition-dialog'
import { SetStatus } from '@/components/status/set-status'
import { StatusDeObra } from '@/components/status/status-de-obra'
import { getServices } from '@/functions/get-services'
import type { Params, Task } from '@/types'

import Link from 'next/link'

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { BtnDialogEditClient } from '@/components/buttons/btn-dialog-edit-client'

dayjs.extend(relativeTime)

export default async function Services({ params }: Params) {
  const { tasks } = await getServices(
    `http://localhost:3005/tasks/${params.id}`,
    ['tasks']
  )
  const { client } = await getServices(
    `http://localhost:3005/client/${params.id}`,
    ['client']
  )

  return (
    <div className="px-4 py-2 flex flex-col gap-4">
      <div className="flex justify-between items-baseline bg-zinc-950 text-white p-4 rounded-md w-full">
        <h1 className="text-xl font-semibold w-40 truncate">
          Cliente: {client?.name}
        </h1>
        <Link
          className="text-lg font-medium py-1 px-2 rounded bg-zinc-800"
          href={`/services/new-task/${client.id}`}
        >
          Criar tarefa
        </Link>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full min-h-[600px] flex flex-col gap-4 overflow-y-auto">
          {tasks?.map((task: Task) => (
            <div key={task.id}>
              <div className="flex flex-col gap-5 justify-between p-5 bg-zinc-950 text-white rounded-md w-full h-full">
                <div className="flex items-baseline justify-between">
                  <h1 className="text-lg font-medium">
                    Tarefa criada em{' '}
                    {dayjs(task.createdAt).format('DD/MM/YYYY')}
                  </h1>
                  <FormEditionDialog
                    id={task.id}
                    clientId={client.id}
                    description={task.description}
                    obs={task.obs}
                    status={task.status}
                    type={task.types}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <p className="break-words">
                    <span className="font-bold text-lg">Descrição: </span>
                    {task.description}
                  </p>
                  <p className="break-words">
                    <span className="font-bold text-lg">Observações: </span>
                    {task.obs}
                  </p>
                  <p className="break-words">
                    <span className="font-bold text-lg">Status: </span>
                    {task.status}
                  </p>
                  <StatusDeObra id={task.id} />
                </div>
                <div>
                  <SetStatus id={task.id} clientId={client.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <BtnDialogEditClient
          id={params.id}
          name={client?.name}
          city={client?.city}
          status={client?.status}
        />
      </div>
    </div>
  )
}
