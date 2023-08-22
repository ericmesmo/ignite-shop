import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { lineItems } = await request.json()

    if (!lineItems) {
      return NextResponse.json({ message: 'Missing products', success: false })
    }

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/`

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: 'payment',
      line_items: lineItems,
    })

    return NextResponse.json(
      {
        checkoutUrl: checkoutSession.url,
        success: true,
      },
      {
        status: 201,
      },
    )
  } catch (err) {
    return NextResponse.json({ message: err, success: false }, { status: 500 })
  }
}
