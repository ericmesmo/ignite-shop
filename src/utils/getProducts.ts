import { stripe } from '@/lib/stripe'
import { cache } from 'react'
import Stripe from 'stripe'

export const revalidate = 60 * 60 * 2 // 2 horas

export const getProducts = cache(async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount!,
      defaultPriceId: price.id,
    }
  })

  return products
})
