import { create } from 'zustand'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  defaultPriceId: string
  qty?: number
}

interface Cart {
  products: Product[]
}

export interface CartState {
  cart: Cart

  add: (product: Product) => void
  total: () => number
  remove: (id: string) => void
}

export const useStore = create<CartState>((set, get) => {
  return {
    cart: { products: [] },

    add: (product: Product) => {
      const { cart } = get()
      const { products } = cart
      const productIndex = products.findIndex((p) => p.id === product.id)

      if (productIndex >= 0) {
        products[productIndex].qty! += 1
      } else {
        products.push({ ...product, qty: 1 })
      }

      set({ cart: { products } })
    },
    total: () => {
      const { cart } = get()
      const { products } = cart
      const total = products.reduce((acc, product) => {
        const price = Number(product.price) * product.qty!
        return acc + price
      }, 0)

      return total
    },
    remove: (id: string) => {
      const { cart } = get()

      const cartWithoutProduct = cart.products.filter(
        (product) => product.id !== id,
      )

      set({ cart: { products: cartWithoutProduct } })
    },
  }
})
