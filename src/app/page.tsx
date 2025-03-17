'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import { login } from '@/services/login'
import { useServerAction } from 'zsa-react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { AiOutlineLoading } from 'react-icons/ai'

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type LoginData = z.infer<typeof loginSchema>

export default function Login() {
  const { execute } = useServerAction(login)
  const [isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const router = useRouter()

  async function handleLogin(formData: LoginData) {
    const [data, err] = await execute({
      email: formData.email,
      password: formData.password,
    })
    if (err) {
      console.log('Erro ao realizar o login', err)
      return
    }
    setIsPending(true)

    if (!data?.tokenSuccess) {
      console.log('Erro ao realizar o login: ', data?.error)
      alert(data?.error)
      setIsPending(false)
      return
    }

    if (data?.tokenSuccess) {
      router.push('/home')
      reset()
    }
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <AiOutlineLoading className="animate-spin w-10 h-10" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-full h-[700px]">
      <div className="flex flex-col gap-5 justify-center items-center w-full h-1/4 p-10">
        <h1 className="text-4xl font-semibold">Prosolar</h1>
        <h2 className="font-normal text-sm text-zinc-500">Entrar</h2>
      </div>
      <div className="w-full h-3/4 flex flex-col items-center p-5">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col w-full max-w-[500px] items-center gap-10"
        >
          <div className="flex flex-col gap-1 w-full">
            <h1 className="font-semibold text-lg">E-mail:</h1>
            <input
              {...register('email')}
              type="text"
              placeholder="Email"
              className="w-full p-3 rounded-md border"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <h1 className="font-semibold text-lg">Senha:</h1>
            <input
              {...register('password')}
              type="password"
              placeholder="Senha"
              className="w-full p-3 rounded-md border"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
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
              <span>Caso não tenha uma conta</span>
              <span>------------</span>
            </p>
            <a href="/cadastro" className="text-sm font-semibold text-blue-600">
              Cadastrar-se
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
