import { CreateNewTask } from '@/pages/create-new-task'
import { getServices } from '@/functions/get-services'

export default async function NewTask({ params }: { params: { id: string } }) {
  const { client } = await getServices(
    `http://localhost:3005/client/${params.id}`
  )

  return (
    <>
      <div className="p-5 m-5 bg-zinc-950 text-white rounded-md">
        <h1 className="font-semibold text-lg">Cliente: {client.name}</h1>
      </div>
      <CreateNewTask client={client} />
    </>
  )
}
