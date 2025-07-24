'use client'

import { useFavorites } from '@/context/FavoritesContext'
import ProductCard from '@/components/ProductCard'
import { FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import Loading from '../loading'

export default function FavoritesPage() {
  const { state, isInitialLoad: isFavoritesLoading } = useFavorites()

  if (isFavoritesLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-between bg-white shadow-sm dark:bg-gray-800">
        <div className="container flex items-center justify-between py-4 mx-auto">
          <h1 className="py-1 text-xl font-bold text-gray-800 dark:text-white">
            My Favorites {state.items.length > 0 && `(${state.items.length})`}
          </h1>
        </div>
      </div>
      <div className="container py-8 mx-auto">
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="p-12 text-center rounded-2xl">
              <FaHeart className="mx-auto mb-6 text-gray-300 text-7xl dark:text-gray-600" />
              <h2 className="mb-3 text-3xl font-bold text-gray-800 dark:text-white">
                You have no favorite products yet
              </h2>
              <p className="mb-8 text-gray-500 dark:text-gray-400">
                Click the heart icon on a product to add it to your favorites.
              </p>
              <Link href="/">
                <button className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg cursor-pointer bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600">
                  Browse Products
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {state.items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
