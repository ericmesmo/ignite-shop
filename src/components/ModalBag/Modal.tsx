'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import axios from 'axios'

import { ItemList } from './ItemList'
import { useStore } from '@/store'
import { getPriceCurrencyFormatter } from '@/utils/priceCurrencyFormatter'

export function Modal() {
  const { cart, total } = useStore((store) => {
    return {
      cart: store.cart,
      total: store.total,
    }
  })
  const isBagEmpty = cart.products.length === 0

  async function handleBuyProduct() {
    const lineItems = cart.products.map((product) => {
      return {
        price: product.defaultPriceId,
        quantity: product.qty,
      }
    })

    const response = await axios.post('/api/checkout', {
      lineItems,
    })

    const { checkoutUrl } = response.data

    window.location.href = checkoutUrl
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-slate-900/20 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed right-0 top-0 h-full max-h-[100vh] w-[480px] bg-elements shadow-xl data-[state=open]:animate-contentShow">
        <div className="flex h-full flex-1 flex-col p-12">
          <Dialog.Title className="mt-6 text-xl/8 font-bold text-title">
            Sacola de compras
          </Dialog.Title>

          <div className="mt-8 flex flex-col gap-6">
            {cart.products.map((product) => (
              <ItemList
                key={product.id}
                id={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>

          <div className="mt-auto flex justify-between">
            <span className="text-base/6 font-normal text-title">
              Quantidade
            </span>
            <span className="text-lg/7 font-normal text-text">
              {cart.products.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg/7 font-bold text-title">Valor total</span>
            <span className="text-2xl/snug font-bold text-title">
              {getPriceCurrencyFormatter(total())}
            </span>
          </div>

          <button
            className="mt-14 cursor-pointer rounded-lg bg-principal p-5 text-lg font-bold text-white enabled:hover:bg-light disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleBuyProduct}
            disabled={isBagEmpty}
          >
            Finalizar compra
          </button>
        </div>

        <Dialog.Close asChild>
          <button
            className="absolute right-[24px] top-[24px] inline-flex appearance-none items-center justify-center rounded-md text-icon focus:outline-none"
            aria-label="Close"
          >
            <X width={24} height={24} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
