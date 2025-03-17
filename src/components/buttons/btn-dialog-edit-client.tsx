'use client'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { FaUserEdit } from 'react-icons/fa'
import { FormEditClient } from '@/components/form/form-edit-client'
import type { ClientProps } from '@/types'

export function BtnDialogEditClient({ id, city, name, status }: ClientProps) {
  return (
    <Dialog>
      <DialogTrigger className="fixed bottom-5 right-5 text-zinc-950 border border-zinc-300 bg-zinc-50 w-16 h-16 flex justify-center items-center text-center rounded-full shadow">
        <FaUserEdit size={26} />
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-md">
        <DialogHeader>
          <DialogTitle className="font-semibold text-lg">
            Editar Cliente
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <FormEditClient id={id} name={name} city={city} status={status} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
