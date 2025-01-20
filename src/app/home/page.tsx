import { Card } from '@/components/card'
import type { Client } from '@/types'

export default async function Home() {
  const response = await fetch('http://localhost:3005/client', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 0,
      tags: ['clients'],
    },
  })
  const data = await response.json()

  return (
    <div className="px-4 py-2 flex flex-col gap-1.5 scroll-smooth">
      {data.clients.map((client: Client) => {
        return (
          <Card
            key={client.id}
            client={client.name}
            completed={client.completed}
            city={client.city}
            createdAt={client.createdAt}
            updatedAt={client.updatedAt}
            status={client.status}
            id={client.id}
          />
        )
      })}
    </div>
  )
}
