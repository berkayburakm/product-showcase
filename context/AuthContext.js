'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authCookie = Cookies.get('auth')
    setIsAuthenticated(authCookie === 'true')
    setIsLoading(false)
  }, [])

  const login = (redirectUrl = '/checkout') => {
    Cookies.set('auth', 'true', { expires: 7 })
    setIsAuthenticated(true)
    return redirectUrl
  }

  const logout = () => {
    Cookies.remove('auth')
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
