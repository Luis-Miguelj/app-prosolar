export function Status({ status }: { status: string }) {
  return (
    <div>
      <div className="group bg-zinc-50 hover:bg-zinc-700 text-zinc-900">
        <span>Status</span>
      </div>
      <div className="hidden bg-zinc-50 text-zinc-900 group-hover:flex">
        {status === 'Em andamento' ? (
          <span>Em andamento</span>
        ) : status === 'Completo' ? (
          <span>Completo</span>
        ) : status === 'Incompleto' ? (
          <span>Incompleto</span>
        ) : (
          'Processando'
        )}
      </div>
    </div>
  )
}
