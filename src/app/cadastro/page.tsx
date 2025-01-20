'use client'

import { cadastro } from '@/services/cadastro'
import type { FormEvent } from 'react'
import { useServerAction } from 'zsa-react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const { execute } = useServerAction(cadastro)
  const router = useRouter()

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    const form = event.currentTarget as EventTarget & HTMLFormElement
    const formData = new FormData(form)
    const [data, err] = await execute({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })

    if (err) {
      console.log('Erro ao criar tarefa', err)
      return
    }

    !data?.tokenSuccess && alert('Erro ao cadastrar')

    if (data?.tokenSuccess) {
      router.push('/home')
      form.reset()
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-[700px]">
      <div className="flex flex-col gap-5 justify-center items-center w-full h-1/4 p-10">
        <h1 className="text-4xl font-semibold">Prosolar</h1>
        <h2 className="font-normal text-sm text-zinc-500">Entrar</h2>
      </div>
      <div className="w-full h-3/4 flex flex-col items-center p-5">
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full max-w-[500px] items-center gap-10"
        >
          <div className="flex flex-col gap-1 w-full">
            <h1 className="font-semibold text-lg">Digite seu nome:</h1>
            <input
              name="name"
              type="text"
              placeholder="Nome"
              className="w-full p-3 rounded-md border"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <h1 className="font-semibold text-lg">E-mail:</h1>
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="w-full p-3 rounded-md border"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <h1 className="font-semibold text-lg">Senha:</h1>
            <input
              name="password"
              type="password"
              placeholder="Senha"
              className="w-full p-3 rounded-md border"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 border bg-blue-600 rounded-md text-white"
          >
            Entrar
          </button>
          <div className="flex flex-col text-center items-center gap-1.5">
            <p className="text-sm font-medium flex gap-1">
              <span>------------</span>
              <span>Caso já tenha uma conta</span>
              <span>------------</span>
            </p>
            <a href="/" className="text-sm font-semibold text-blue-600">
              Voltar para o login
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
