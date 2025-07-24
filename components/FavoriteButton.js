'use client'

import { useFavorites } from '@/context/FavoritesContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function FavoriteButton({ product }) {
  const { state, dispatch } = useFavorites()
  const isFavorited = state.items.some(item => item.id === product.id)

  const handleToggleFavorite = () => {
    if (isFavorited) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product })
      toast.error(`${product.title} removed from favorites`)
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: product })
      toast.success(`${product.title} added to favorites`)
    }
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className="flex items-center justify-center gap-2 px-3 py-[10px] text-lg font-semibold transition-all duration-200 rounded-lg cursor-pointer border border-gray-300
      text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:border-gray-200 dark:text-gray-300"
    >
      {isFavorited ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  )
}
