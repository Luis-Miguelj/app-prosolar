export async function getClients() {
  const response = await fetch('http://localhost:3005/client', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 0,
    },
  })
  const data = await response.json()

  return data.clients
}
