'use client'

import { useCart } from '@/context/CartContext'
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import Loading from '../loading'
import Link from 'next/link'

export default function CheckoutPage() {
  const { state, dispatch, isInitialLoad: isCartLoading } = useCart()

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const handleRemoveItem = id => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } })
  }

  const handleIncreaseQuantity = id => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id } })
  }

  const handleDecreaseQuantity = id => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id } })
  }

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (isCartLoading) {
    return <Loading />
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-between bg-white shadow-sm dark:bg-gray-800">
        <div className="container flex items-center justify-between py-4 mx-auto">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            My Cart {state.items.length > 0 && `(${state.items.length})`}
          </h1>
          {state.items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="px-4 py-2 text-sm font-medium text-red-500 transition-all duration-300 rounded-lg cursor-pointer hover:text-red-600 hover:bg-red-100"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
      <div className="container mx-auto">
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="p-12 text-center rounded-2xl">
              <FaShoppingCart className="mx-auto mb-6 text-gray-300 text-7xl dark:text-gray-600" />
              <h2 className="mb-3 text-3xl font-bold text-gray-800 dark:text-white">
                Your cart is empty
              </h2>
              <p className="mb-8 text-gray-500 dark:text-gray-400">
                Looks like you haven't added anything to your cart yet.
              </p>

              <Link href="/">
                <button className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg cursor-pointer bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600">
                  Let's go shopping
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md lg:col-span-2 dark:bg-gray-800">
              <div className="space-y-4">
                {state.items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-contain w-16 h-16 rounded-lg"
                      />
                      <div className="flex flex-col items-start gap-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          ${item.price}
                        </p>
                        <div className="flex items-center px-[4px] py-[1px] border border-gray-200 rounded-[16px]">
                          {item.quantity === 1 ? (
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-2 text-red-500 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl"
                            >
                              <FaTrash size={12} />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDecreaseQuantity(item.id)}
                              className="p-2 text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
                            >
                              <FaMinus size={12} />
                            </button>
                          )}
                          <span className="px-4 py-1 text-lg font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="p-2 text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-bold text-dark-600 dark:text-dark-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 rounded-lg cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/50"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 top-8">
                <h2 className="pb-4 mb-4 text-xl font-semibold border-b border-gray-200 dark:border-gray-700">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      Total:
                    </span>
                    <span className="font-bold text-gray-800 dark:text-white">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full px-6 py-2 text-lg font-semibold text-white transition-all duration-200 bg-green-500 rounded-lg cursor-pointer hover:bg-green-600">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
