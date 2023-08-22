'use client'

import 'keen-slider/keen-slider.min.css'

import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import { useState } from 'react'
import { useStore } from '@/store'
import { getPriceCurrencyFormatter } from '@/utils/priceCurrencyFormatter'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  defaultPriceId: string
}

interface CardProductProps {
  products: Product[]
}

export function CardProduct({ products }: CardProductProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'free-snap',
    slides: {
      origin: 'auto',
      perView: 2,
      spacing: 48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const { add } = useStore((store) => {
    return {
      add: store.add,
    }
  })

  function handleAddProduct(
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product,
  ) {
    event.preventDefault()

    add(product)
  }

  return (
    <div ref={sliderRef} className="keen-slider navigation-wrapper relative">
      {products.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="keen-slider__slide relative flex w-[696px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-green-300 to-violet-300 shadow-md"
          >
            <Image
              className="object-cover"
              src={product.imageUrl}
              alt=""
              width={520}
              height={480}
            />

            <footer className="absolute bottom-1 left-1 right-1 flex translate-y-110 items-center justify-between rounded-md bg-black/60 p-8   opacity-0 transition-footer hover:translate-y-0 hover:opacity-100 ">
              <div className="flex flex-col">
                <strong className="text-xl/8 font-bold text-title">
                  {product.name}
                </strong>
                <span className="text-2xl/8 font-bold text-light">
                  {getPriceCurrencyFormatter(product.price)}
                </span>
              </div>

              <button
                type="button"
                className=" flex items-center rounded-md bg-principal p-3 text-white hover:bg-light"
                onClick={(event) => handleAddProduct(event, product)}
              >
                <ShoppingBag width={32} height={32} />
              </button>
            </footer>
          </Link>
        )
      })}
    </div>
  )
}
