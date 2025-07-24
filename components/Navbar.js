'use client'

import Link from 'next/link'
import { FiShoppingCart, FiHeart, FiLogOut } from 'react-icons/fi'
import ThemeSwitch from './ThemeSwitch'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { state: cartState, isInitialLoad: isCartLoading } = useCart()
  const { state: favoritesState, isInitialLoad: isFavoritesLoading } =
    useFavorites()
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const totalCartItems = cartState.items.length
  const totalFavorites = favoritesState.items.length

  const isLoading = isCartLoading || isFavoritesLoading

  return (
    <nav className="w-full py-4 transition-colors duration-300 bg-white border-b border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 transition-colors duration-200 dark:text-white hover:text-amber-600 dark:hover:text-amber-400"
        >
          PS
        </Link>
        <div className="flex items-center gap-4">
          <ThemeSwitch />

          <Link
            href="/favorites"
            className={`relative p-2 text-gray-700 transition-all duration-200 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-110 ${
              isLoading ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <FiHeart size={18} />
            {totalFavorites > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                {totalFavorites}
              </span>
            )}
          </Link>
          <a
            href="/checkout"
            className={`relative p-2 text-gray-700 transition-all duration-200 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-110 ${
              isLoading ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <FiShoppingCart className="text-lg" />
            {totalCartItems > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                {totalCartItems}
              </span>
            )}
          </a>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="p-2 text-gray-700 transition-all duration-200 bg-gray-100 rounded-full cursor-pointer dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-110"
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
