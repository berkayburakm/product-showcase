'use client'

import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import Dropdown from './Dropdown'
import { FiSearch, FiFilter } from 'react-icons/fi'
import { GoSortAsc, GoSortDesc } from 'react-icons/go'

export default function ProductFilters({ products }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState('default')

  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category)
    return ['all', ...new Set(allCategories)]
  }, [products])

  const sortOptions = [
    { id: 'default', name: 'Default' },
    { id: 'price-asc', name: 'Price: Low to High' },
    { id: 'price-desc', name: 'Price: High to Low' },
    { id: 'rating-asc', name: 'Rating: Low to High' },
    { id: 'rating-desc', name: 'Rating: High to Low' },
    { id: 'reviews-asc', name: 'Reviews: Low to High' },
    { id: 'reviews-desc', name: 'Reviews: High to Low' },
  ]

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })

    if (sortOrder === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortOrder === 'rating-asc') {
      filtered.sort((a, b) => a.rating.rate - b.rating.rate)
    } else if (sortOrder === 'rating-desc') {
      filtered.sort((a, b) => b.rating.rate - a.rating.rate)
    } else if (sortOrder === 'reviews-asc') {
      filtered.sort((a, b) => a.rating.count - b.rating.count)
    } else if (sortOrder === 'reviews-desc') {
      filtered.sort((a, b) => b.rating.count - a.rating.count)
    }

    return filtered
  }, [products, searchTerm, selectedCategory, sortOrder])

  return (
    <div>
      <div className="flex flex-col items-center gap-4 mb-8 md:flex-row">
        <div className="relative flex-grow w-full">
          <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Dropdown
              options={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
              rightIcon={
                <FiFilter className="text-gray-500 dark:text-gray-400" />
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Dropdown
              options={sortOptions}
              selected={sortOrder}
              onChange={setSortOrder}
              isObject
              rightIcon={
                sortOrder.includes('asc') ? <GoSortAsc /> : <GoSortDesc />
              }
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedAndFilteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
