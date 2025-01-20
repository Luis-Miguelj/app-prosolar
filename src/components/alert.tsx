'use client'
import { useRouter } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface AlertProps {
  dialog: boolean
  id: string
}

export function Alert({ dialog, id }: AlertProps) {
  const routes = useRouter()

  return (
    <AlertDialog open={dialog}>
      <AlertDialogContent className="bg-zinc-950 border-zinc-800 w-5/6 rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Deseja criar uma nova tarefa para o cliente?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-300">
            Aperte algum dos botões abaixo para continuar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => routes.push('/home')}
            className="text-zinc-950"
          >
            Voltar para tela principal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => routes.push(`/services/new-task/${id}`)}
            className="bg-green-950 text-white border border-zinc-900"
          >
            Criar tarefa para cliente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
