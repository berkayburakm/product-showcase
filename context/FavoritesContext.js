'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react'

const FavoritesContext = createContext()

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVORITES':
      return { ...state, ...action.payload }
    case 'ADD_TO_FAVORITES':
      if (state.items.find(item => item.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      }
    default:
      return state
  }
}

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { items: [] })
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      dispatch({ type: 'SET_FAVORITES', payload: JSON.parse(savedFavorites) })
    }
    setIsInitialLoad(false)
  }, [])

  useEffect(() => {
    if (isInitialLoad) return

    if (state.items.length === 0) {
      localStorage.removeItem('favorites')
    } else {
      localStorage.setItem('favorites', JSON.stringify(state))
    }
  }, [state, isInitialLoad])

  return (
    <FavoritesContext.Provider value={{ state, dispatch, isInitialLoad }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  return useContext(FavoritesContext)
}
