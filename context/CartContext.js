'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, ...action.payload }
    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      )
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) })
    }
    setIsInitialLoad(false)
  }, [])

  useEffect(() => {
    if (isInitialLoad) return

    if (state.items.length === 0) {
      localStorage.removeItem('cart')
    } else {
      localStorage.setItem('cart', JSON.stringify(state))
    }
  }, [state, isInitialLoad])

  return (
    <CartContext.Provider value={{ state, dispatch, isInitialLoad }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
