'use client'

import * as ModalBag from '@/components/ModalBag'
import { useStore } from '@/store'
import { getPriceCurrencyFormatter } from '@/utils/priceCurrencyFormatter'

interface Product {
  id: string
  name: string
  description: string | null
  imageUrl: string
  price: number
  defaultPriceId: string
}

interface DescriptionProductProps {
  product: Product
}

export function DescriptionProduct({ product }: DescriptionProductProps) {
  const { add } = useStore((store) => {
    return {
      add: store.add,
    }
  })

  function handleAddProduct(product: Product) {
    add(product)
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-title">{product.name}</h1>

      <span className="mt-4 block text-2xl text-light">
        {getPriceCurrencyFormatter(product.price)}
      </span>

      <p className="mt-10 text-lg/relaxed text-text">{product.description}</p>

      <ModalBag.Root>
        <ModalBag.Trigger>
          <button
            className="mt-auto cursor-pointer rounded-lg bg-principal p-5 text-lg font-bold text-white enabled:hover:bg-light disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => handleAddProduct(product)}
          >
            Colocar na sacola
          </button>
        </ModalBag.Trigger>

        <ModalBag.Modal />
      </ModalBag.Root>
    </div>
  )
}
