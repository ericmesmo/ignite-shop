import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export const revalidate = 60 * 60 * 1 // 1 hora

export async function getProductById(id: string) {
  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    imageUrl: product.images[0],
    price: price.unit_amount!,
    defaultPriceId: price.id,
  }
}
