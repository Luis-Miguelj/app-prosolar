'use client'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
} from '@/components/ui/drawer'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { IoMdCloseCircle } from 'react-icons/io'
import type { PartialCompleted } from '@/types'

export function OptionsTask({ taskId }: { taskId: string }) {
  const [validation, setValidation] = useState<boolean>(false)
  const [data, setData] = useState<PartialCompleted>()

  console.log('OptionsTask: ', taskId)

  const router = useRouter()

  useEffect(() => {
    if (!data?.inicio && !data?.fim) {
      setValidation(false)
    }
    if (data?.inicio && !data?.fim) {
      setValidation(false)
    }
    if (data?.inicio && data?.fim) {
      setValidation(true)
    }
  }, [data?.inicio, data?.fim])

  return (
    <Drawer>
      <DrawerTrigger className="w-20 bg-white text-zinc-950 rounded-md font-semibold">
        ...
      </DrawerTrigger>
      <DrawerContent className="flex flex-col gap-5 min-h-[500px]">
        <DrawerHeader className="flex justify-between px-5">
          <DrawerTitle className="text-2xl font-semibold">Opções</DrawerTitle>
          <DrawerClose>
            <IoMdCloseCircle size={26} />
          </DrawerClose>
        </DrawerHeader>
        <div className="w-full flex flex-col gap-4 px-5">
          <DrawerClose
            onClick={() =>
              router.push(`/services/${taskId}/partial-completion`)
            }
            className={`flex flex-col gap-2 justify-start text-left border p-3 rounded-md ${!data?.inicio && !data?.fim ? 'bg-zinc-50 border-zinc-200 hover:bg-zinc-200' : data.inicio && !data.fim ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-200' : 'bg-green-50 border-green-200 hover:bg-green-300'} transition-all`}
            disabled={validation}
          >
            <h1 className="text-lg font-bold">Encerramento parcial</h1>
            <p className="text-xs font-semibold">
              Nesta opção, você finaliza a tarefa parcialmente se não conseguiu
              terminá-la por conta de algum imprevisto, podendo retornar ao
              atendimento posteriormente.
            </p>
            {!data?.inicio && !data?.fim ? (
              <p className="font-semibold text-base">
                Aperte para finalizar a tarefa parcialmente.
              </p>
            ) : data.inicio && !data.fim ? (
              <div>
                <p className="font-medium text-sm">
                  Tarefa parcialmente finalizada.
                </p>
                <p className="font-semibold text-base">
                  Aperte para retomar tarefa.
                </p>
              </div>
            ) : (
              <p className="font-semibold text-base">
                Finalização parcial encerrada. Tarefa retomada.
              </p>
            )}
          </DrawerClose>
          <DrawerClose className="flex flex-col gap-2 justify-start text-left border p-3 rounded-md bg-red-100 border-red-300 hover:bg-red-400 transition-all">
            <h1 className="text-lg font-bold">Excluir</h1>
            <p className="text-sm font-medium">
              Essa opção exclui a tarefa permanentemente.
            </p>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
