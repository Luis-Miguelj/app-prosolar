import type { Metadata } from 'next'
import './globals.css'

import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Prosolar',
  description: 'App de montioramento de tarefas e gestão de tempo.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={'antialiased min-h-screen bg-white text-zinc-950'}>
        <Header />
        {children}
      </body>
    </html>
  )
}
