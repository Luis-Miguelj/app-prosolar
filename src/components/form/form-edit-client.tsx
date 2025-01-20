export function FormEditClient({ id }: { id: string }) {
  return (
    <form className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-2 w-full">
        <span className="font-medium text-base">Nome:</span>
        <input
          type="text"
          id="name"
          className="p-3 w-full rounded outline-none border border-zinc-200"
          placeholder="Nome"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="font-medium text-base">Cidade:</span>
        <input
          type="text"
          id="city"
          className="p-3 w-full rounded outline-none border border-zinc-200"
          placeholder="Cidade"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="font-medium text-base">Status:</span>
        <select
          name="status"
          className="p-2 rounded bg-white border font-medium border-zinc-300 outline-none"
        >
          <option value="a">Em andamento</option>
          <option value="c">Completa</option>
          <option value="i">Incompleta</option>
        </select>
      </div>
    </form>
  )
}
