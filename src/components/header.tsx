'use client'
import { useState, useEffect } from 'react'
import { usePathname, useParams, useRouter } from 'next/navigation'

import { IoHome } from 'react-icons/io5'
import { IoPersonAdd } from 'react-icons/io5'

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from './ui/drawer'

import { IoMenu } from 'react-icons/io5'

export function Header() {
  const pathname = usePathname()
  const { id } = useParams() as { id: string }
  const routes = useRouter()

  const [path, setPath] = useState<string>()

  useEffect(() => {
    switch (pathname) {
      case '/home':
        setPath('Início')
        break
      case '/client':
        setPath('Novo Cliente')
        break
      case `/services/${id}`:
        setPath('Serviços')
        break
      case '/services/new-task':
        setPath('Nova Tarefa')
        break
      case `/services/new-task/${id}`:
        setPath('Nova Tarefa')
        break
      default:
        setPath('Página não encontrada')
        break
    }
  }, [pathname, id])

  if (pathname === '/' || pathname === '/cadastro') {
    return null
  }

  return (
    <header className="h-20 flex justify-center items-baseline border-b border-zinc-700 px-5 bg-zinc-950 text-white">
      <div className="w-full h-full flex items-center justify-between">
        <h1 className="font-semibold text-2xl">{path}</h1>
        <Drawer>
          <DrawerTrigger>
            <IoMenu size={30} />
          </DrawerTrigger>
          <DrawerContent className="min-h-[500px] flex flex-col w-full bg-white border-zinc-700">
            <div className="w-full h-full p-4 flex flex-col gap-4">
              <DrawerTitle className="text-2xl">Menu</DrawerTitle>
              <div className="w-full flex flex-col gap-2">
                <DrawerClose
                  className="w-full flex gap-1.5 items-baseline text-start bg-white text-zinc-950 p-2 border-b border-zinc-400 hover:bg-zinc-300 transition-all"
                  onClick={() => routes.push('/home')}
                >
                  <IoHome />
                  Início
                </DrawerClose>
                <DrawerClose
                  className="w-full flex gap-1.5 items-baseline text-start bg-white text-zinc-950 p-2 border-b border-zinc-400 hover:bg-zinc-300 transition-all"
                  onClick={() => routes.push('/services/new-task')}
                >
                  Criar tarefa
                </DrawerClose>
                <DrawerClose
                  className="w-full flex gap-1.5 items-baseline text-start bg-white text-zinc-950 p-2 border-b border-zinc-400 hover:bg-zinc-300 transition-all"
                  onClick={() => routes.push('/client')}
                >
                  <IoPersonAdd />
                  Criar cliente
                </DrawerClose>
              </div>
            </div>
            <DrawerFooter className="w-full flex justify-end items-end">
              <h1>Sair</h1>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}
