import { GetLengthTasks } from '@/components/get-length-tasks'

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import Link from 'next/link'

dayjs.locale('pt-br')
interface CardProps {
  id: string
  client: string
  createdAt: Date
  city: string
  status: string
  completed: boolean
  updatedAt?: Date
}

export function Card(data: CardProps) {
  return (
    <Link href={`/services/${data.id}`} className="cursor-pointer">
      <div
        className={
          'h-40 w-full flex text-white bg-zinc-950 flex-col justify-between gap-1.5 rounded-lg shadow-sm border border-zinc-200 my-1 py-2 px-4'
        }
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-ellipsis break-words">
              {data.client}
            </h1>
            <h2 className="text-sm font-medium text-ellipsis break-words">
              {data.city}
            </h2>
          </div>
          <div
            className={`h-6 w-6 rounded-full ${data.status === 'Em andamento' ? 'bg-yellow-400' : data.status === 'Incompleto' ? 'bg-red-600' : data.status === 'Completo' ? 'bg-green-600' : 'bg-zinc-700'}`}
          >
            {''}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <GetLengthTasks id={data.id} />
            <h2>Status: {data.status}</h2>
          </div>
          <div className="flex justify-end items-center">
            <p className="p-1.5 font-medium text-sm rounded bg-zinc-100 text-zinc-950">
              {dayjs(new Date()).format('DD/MM/YYYY')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
