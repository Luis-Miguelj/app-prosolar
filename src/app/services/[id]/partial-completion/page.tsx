'use client'
import type { Params } from '@/types'
import { useServerAction } from 'zsa-react'
import { partialCompleted } from '@/services/partial-completed'
import { BtnBack } from '@/components/buttons/btn-back'

import {
  type PartialCompletedTask,
  partialCompletedSchema,
} from '@/types/zod-types'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function PartialCompletion({ params }: Params) {
  const { data, execute } = useServerAction(partialCompleted)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PartialCompletedTask>({
    resolver: zodResolver(partialCompletedSchema),
  })

  async function partialCompletedTask(formData: PartialCompletedTask) {
    const [data, err] = await execute({
      id: params.id,
      obs: formData.obs,
      inicio: new Date(),
    })

    if (err) {
      alert(`Algo deu errado. ${err}`)
      return
    }

    if (!data) {
      alert('Algo deu errado.')
      return
    }

    console.log(data)
    return
  }

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="flex flex-col gap-10 w-full p-5">
        <div className="w-full flex justify-between p-5 rounded-md bg-zinc-950 text-white font-semibold">
          <BtnBack />
          <h1 className="text-lg">Finalização parcial</h1>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold">Observação:</h1>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(partialCompletedTask)}
          >
            <div>
              <textarea
                {...register('obs')}
                className="h-96 w-full border border-zinc-300 rounded-md p-3"
                placeholder="Observações..."
              />
              {errors.obs && (
                <p className="text-red-500 text-sm">{errors.obs.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-400 transition-all"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
