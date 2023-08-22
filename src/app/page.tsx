import { getProducts } from '@/utils/getProducts'
import { CardProduct } from '@/components/CardProduct'

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="ml-auto flex min-h-home w-full max-w-home">
      <CardProduct products={products} />
    </div>
  )
}
