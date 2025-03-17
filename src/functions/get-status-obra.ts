export async function getStatusObra(id: string) {
  const response = await fetch(`http://localhost:3005/obra/status/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['obras'],
      revalidate: 0,
    },
  })

  const data = await response.json()

  return data
}
