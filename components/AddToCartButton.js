'use client'

import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

export default function AddToCartButton({ product }) {
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    toast.success('Added to cart')
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center justify-center px-4 py-2 font-semibold text-white transition-transform duration-300 transform rounded-lg cursor-pointer bg-amber-600 hover:bg-amber-700 hover:scale-105"
    >
      Add to Cart
    </button>
  )
}
