'use client'

import { FiSun, FiMoon } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 text-gray-700 transition-all duration-200 bg-gray-100 rounded-full cursor-pointer dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-110"
    >
      {resolvedTheme === 'dark' ? (
        <FiSun className="text-lg" />
      ) : (
        <FiMoon className="text-lg" />
      )}
    </button>
  )
}
