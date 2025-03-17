import { CreateNewService } from '@/pages/create-new-service'
import { getServices } from '@/functions/get-services'

export default async function NewTask() {
  const { clients } = await getServices('http://localhost:3005/client', [
    'clients',
  ])

  return (
    <>
      <CreateNewService clients={clients} />
    </>
  )
}
