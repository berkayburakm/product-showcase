'use client'

import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>{children}</CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
