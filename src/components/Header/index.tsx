'use client'

import * as ModalBag from '@/components/ModalBag'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'

import logoImg from '@/assets/logo.svg'
import { useStore } from '@/store'
import { useSearchParams } from 'next/navigation'

export function Header() {
  const params = useSearchParams()
  const isSuccessPage = params.get('session_id') !== null

  const { cart } = useStore((store) => {
    return {
      cart: store.cart,
    }
  })

  return (
    <header
      className={`mx-auto my-0 flex w-full max-w-6xl px-0 py-8 ${
        isSuccessPage ? 'justify-center' : 'justify-between'
      }`}
    >
      <Image src={logoImg} alt="" />

      {!isSuccessPage && (
        <ModalBag.Root>
          <ModalBag.Trigger>
            <button
              className={`relative flex items-center rounded-md bg-elements p-3  ${
                cart?.products.length === 0 ? 'text-icon' : 'text-text'
              } disabled:cursor-not-allowed disabled:opacity-60`}
              disabled={cart?.products.length === 0}
            >
              <ShoppingBag width={24} height={24} />
              <span className="sr-only">Bag</span>
              {cart.products.length > 0 && (
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-principal text-sm/relaxed font-bold text-white">
                  {cart.products.length}
                </div>
              )}
            </button>
          </ModalBag.Trigger>

          <ModalBag.Modal />
        </ModalBag.Root>
      )}
    </header>
  )
}
