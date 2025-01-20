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
import { FormEditClient } from './form/form-edit-client'

export function BtnDialogEditClient({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger className="fixed bottom-5 right-5 text-zinc-950 border border-zinc-300 bg-zinc-50 w-16 h-16 flex justify-center items-center text-center rounded-full shadow">
        <FaUserEdit size={26} />
      </DialogTrigger>
      <DialogContent className="w-96 rounded-md">
        <DialogHeader>
          <DialogTitle className="font-semibold text-lg">
            Editar Cliente
          </DialogTitle>
        </DialogHeader>
        <div className="w-full ">
          <FormEditClient id={id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
