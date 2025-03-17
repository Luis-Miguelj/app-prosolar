export async function getServices(url: string, tags: string[]) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: tags,
      revalidate: 0,
    },
  })

  const data = response.json()

  return data
}
