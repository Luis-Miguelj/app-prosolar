export async function GetLengthTasks({ id }: { id: string }) {
  const response = await fetch(`http://localhost:3005/tasks/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 0,
      tags: ['tasks'],
    },
  })
  const data = await response.json()

  const lengthTasks = data.tasks.filter(
    (tasks: { completed: boolean }) => tasks.completed === false
  )

  return <h1>Tarefas a fazer: {lengthTasks.length}</h1>
}
