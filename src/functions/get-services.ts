export async function getServices(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 0,
    },
  })

  const data = response.json()

  return data
}
