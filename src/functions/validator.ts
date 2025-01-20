export function validatorType(type: string) {
  switch (type) {
    case 'O&M':
      return 'o'
    case 'Manutenção':
      return 'm'
    case 'Instalação':
      return 'i'
    default:
      return type
  }
}

export function validatorStatus(status: string) {
  switch (status) {
    case 'Em andamento':
      return 'a'

    case 'Completa':
      return 'c'

    case 'Incompleto':
      return 'i'

    default:
      return status
  }
}
