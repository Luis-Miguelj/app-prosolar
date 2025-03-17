'use client'
import { IoArrowBack } from 'react-icons/io5'

import { useRouter } from 'next/navigation'

export function BtnBack() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()}>
      <IoArrowBack size={26} />
    </button>
  )
}
