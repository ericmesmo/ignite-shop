import Image from 'next/image'

import { getProductById } from '@/utils/getProductById'
import { DescriptionProduct } from '@/components/DescriptionProduct'

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  return (
    <main className="mx-auto my-0 grid max-w-1180 grid-cols-2 items-stretch gap-16">
      <div className="flex h-656 w-full max-w-xl items-center justify-center rounded-lg bg-gradient-to-b from-green-300 to-violet-300 p-1">
        <Image
          src={product.imageUrl}
          alt=""
          width={520}
          height={480}
          className="object-cover"
        />
      </div>

      <DescriptionProduct product={product} />
    </main>
  )
}
