import { useStore } from '@/store'
import { getPriceCurrencyFormatter } from '@/utils/priceCurrencyFormatter'
import Image from 'next/image'

interface ItemListProps {
  id: string
  imageUrl: string
  name: string
  price: number
}

export function ItemList({ id, imageUrl, name, price }: ItemListProps) {
  const { remove } = useStore((store) => {
    return {
      remove: store.remove,
    }
  })

  function handleRemoveProduct(id: string) {
    remove(id)
  }
  return (
    <div className="flex flex-row gap-5">
      <Image
        src={imageUrl}
        alt=""
        className="flex items-center justify-center rounded-lg bg-gradient-to-b from-green-300 to-violet-300 px-1 py-0"
        width={101}
        height={93}
      />
      <div className="flex flex-col items-start gap-2">
        <div className="flex flex-col">
          <span className="self-stretch text-ellipsis text-lg/7 text-text ">
            {name}
          </span>
          <span className="text-lg/7 font-bold text-title">
            {getPriceCurrencyFormatter(price)}
          </span>
        </div>
        <button
          className="flex cursor-pointer items-center justify-center text-base font-bold text-principal hover:text-light"
          onClick={() => handleRemoveProduct(id)}
        >
          Remover
        </button>
      </div>
    </div>
  )
}
