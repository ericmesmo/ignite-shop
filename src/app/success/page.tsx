import { getCheckoutSession } from '@/utils/getCheckoutSession'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page({
  searchParams,
}: {
  searchParams: { session_id: string }
}) {
  if (!searchParams.session_id) {
    redirect('/')
  }

  const checkout = await getCheckoutSession(searchParams.session_id)

  if (!checkout) {
    redirect('/')
  }

  return (
    <main className="mx-auto my-0 flex h-656 flex-col items-center justify-center">
      <div className="inline-flex items-center justify-center -space-x-12">
        {checkout.products?.map(({ product }) => {
          return (
            <div
              key={product.id}
              className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-green-300 to-violet-300 px-1 py-0 shadow-2xl"
            >
              <Image
                alt=""
                src={product.images[0]}
                width={130}
                height={130}
                className="flex shrink-0 items-center justify-center"
              />
            </div>
          )
        })}
      </div>
      <h1 className="mt-12 text-3xl/10 font-bold text-title">
        Compra efetuada!
      </h1>

      <p className="mt-6 text-center text-2xl/10 text-text">
        Uhuul <strong>{checkout.custumerName}</strong>, sua compra de{' '}
        {checkout.products?.length} camisetas já está a caminho da sua casa.
      </p>

      <Link
        href="/"
        className="mt-16 inline-flex items-center justify-center gap-2 text-xl/8 font-bold text-principal hover:text-light"
      >
        Voltar ao catálogo
      </Link>
    </main>
  )
}
