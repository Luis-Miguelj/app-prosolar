import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface BtnStartEndProps {
  id: string
}

interface Status {
  obra: {
    inicioDeObra: {
      inicio: Date
      fim: Date
    }
    fimDeObra: {
      inicio: Date
      fim: Date
    }
  }
}

export async function StatusDeObra({ id }: BtnStartEndProps) {
  const response = await fetch(`http://localhost:3005/obra/status/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['obras'],
      revalidate: false,
    },
  })

  const data: Status = await response.json()

  return (
    <div className="text-white font-medium flex flex-col gap-5">
      <div className="flex justify-between gap-5">
        <p>
          {!data?.obra.inicioDeObra.fim
            ? 'Obra não iniciada'
            : `Obra Iniciada: ${dayjs(data?.obra.inicioDeObra.fim).hour()}h${dayjs(data?.obra.inicioDeObra.fim).minute()}`}
        </p>
        <p>
          {!data.obra.inicioDeObra.inicio
            ? 'Data não definida'
            : `Dia da inicialização: ${dayjs(data.obra.inicioDeObra.inicio).format('DD/MM/YYYY')}`}
        </p>
      </div>
      <div className="flex justify-between gap-5">
        <p>
          {!data?.obra.fimDeObra.inicio
            ? 'Obra não finalizada'
            : `Obra Finalizada: ${dayjs(data?.obra.fimDeObra.inicio).hour()}h${dayjs(data?.obra.fimDeObra.inicio).minute()}`}
        </p>
        <p>
          {!data.obra.fimDeObra.fim
            ? 'Chegada na empresa não definida'
            : `Dia da finalização: ${dayjs(data.obra.fimDeObra.fim).format('DD/MM/YYYY')}`}
        </p>
      </div>
    </div>
  )
}
