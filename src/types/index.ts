export type Params = {
  params: {
    id: string
  }
}

export interface Client {
  id: string
  name: string
  city: string
  status: string
  completed: boolean
  createdAt: Date
  updatedAt?: Date
}

export interface Task {
  id: string
  description: string
  obs?: string
  types: string
  status: string
  completed: boolean
  createdAt: Date
  updatedAt?: Date
  clientId: string
}

export interface Status {
  obra: {
    inicioDeObra: {
      id: string
      inicio: Date
      fim: Date
    }
    fimDeObra: {
      id: string
      inicio: Date
      fim: Date
    }
  }
}

export interface ClientProps {
  id: string
  name: string
  city: string
  status: string
}

export type PartialCompleted = {
  id: string
  inicio: Date
  fim: Date
  taskId: string
}
