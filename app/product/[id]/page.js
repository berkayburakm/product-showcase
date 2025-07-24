import AddToCartButton from '@/components/AddToCartButton'
import { FaStar, FaCheckCircle } from 'react-icons/fa'
import FavoriteButton from '@/components/FavoriteButton'
import Image from 'next/image'

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!res.ok) {
    return undefined
  }
  return res.json()
}

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="min-h-screen py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="p-8 bg-white shadow-xl rounded-2xl">
            <Image
              src={product.image}
              alt={product.title}
              className="object-contain w-full h-auto max-h-[70vh] rounded-lg"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col items-start space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight text-gray-800 dark:text-white">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 text-sm capitalize transition-all bg-gray-200 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 text-dark-500 dark:border-gray-600">
                {product.category}
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500 -mt-[4px]" size={20} />
                <span className="text-gray-600 dark:text-gray-300">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500 -mt-[4px]" size={20} />
                <span className="text-gray-600 dark:text-gray-300">
                  In Stock
                </span>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
            <div className="flex items-center justify-between w-full pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-5xl font-bold text-dark-600 dark:text-dark-400">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center w-full gap-4">
              <AddToCartButton product={product} />
              <FavoriteButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
