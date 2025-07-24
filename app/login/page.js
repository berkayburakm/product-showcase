'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading, login } = useAuth()

  const handleLogin = e => {
    e.preventDefault()
    const redirectUrl = searchParams.get('redirect') || '/checkout'
    login()
    router.refresh()
    router.push(redirectUrl)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="flex justify-center py-12">
      <div className="container flex items-center justify-center p-4 mx-auto">
        <div className="w-full max-w-md p-8 bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-800 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 transition-colors duration-200 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 transition-colors duration-200 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-600 dark:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-800"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This is a demo login - just click Sign In to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
