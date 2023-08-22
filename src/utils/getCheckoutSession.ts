import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function getCheckoutSession(sessionId: string) {
  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    })

    const custumerName = checkoutSession.customer_details?.name
    const products = checkoutSession.line_items?.data.map((lineItem) => {
      return {
        product: lineItem.price?.product as Stripe.Product,
      }
    })

    return {
      custumerName,
      products,
    }
  } catch (error) {
    return null
  }
}
