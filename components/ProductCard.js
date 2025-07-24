'use client'

import Link from 'next/link'
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function ProductCard({ product }) {
  const { dispatch: cartDispatch } = useCart()
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites()

  const isFavorited = favoritesState.items.some(item => item.id === product.id)

  const handleAddToCart = e => {
    e.preventDefault()
    e.stopPropagation()
    cartDispatch({ type: 'ADD_TO_CART', payload: product })
    toast.success(`${product.title} added to cart`)
  }

  const handleToggleFavorite = e => {
    e.preventDefault()
    e.stopPropagation()
    if (isFavorited) {
      favoritesDispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product })
      toast.error(`${product.title} removed from favorites`)
    } else {
      favoritesDispatch({ type: 'ADD_TO_FAVORITES', payload: product })
      toast.success(`${product.title} added to favorites`)
    }
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="flex flex-col transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-700/50 group"
    >
      <div className="relative p-4 overflow-hidden rounded-t-lg bg-gray-50 ">
        <button
          onClick={handleToggleFavorite}
          className="absolute z-10 p-2 bg-white rounded-full shadow-md cursor-pointer top-2 right-2 dark:bg-gray-800"
        >
          {isFavorited ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-500" />
          )}
        </button>
        <Image
          width={200}
          height={200}
          src={product.image}
          alt={product.title}
          className="object-contain w-full h-56 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center px-4 py-2 font-semibold text-white transition-transform duration-300 transform rounded-lg cursor-pointer bg-amber-600 hover:bg-amber-700 hover:scale-105"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h2 className="mb-1 text-lg font-bold leading-tight text-gray-800 dark:text-white line-clamp-2">
          {product.title}
        </h2>
        <p className="mb-3 text-sm text-gray-500 capitalize dark:text-gray-400">
          {product.category}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center space-x-1">
            <FaStar className="text-yellow-400" />
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
