import { CreateNewTask } from '@/pages/create-new-task'
import { getServices } from '@/functions/get-services'
import { BtnBack } from '@/components/buttons/btn-back'

export default async function NewTask({ params }: { params: { id: string } }) {
  const { client } = await getServices(
    `http://localhost:3005/client/${params.id}`,
    ['clients']
  )
  console.log(client)

  return (
    <>
      <div className="flex justify-between p-5 m-5 bg-zinc-950 text-white rounded-md">
        <BtnBack />
        <h1 className="font-semibold text-lg">Cliente: {client?.name}</h1>
      </div>
      <CreateNewTask client={client} />
    </>
  )
}
