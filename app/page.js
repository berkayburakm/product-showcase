import ProductFilters from '@/components/ProductFilters'

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  return res.json()
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black md:text-5xl dark:text-white">
            Featured Products
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Discover our carefully curated collection of premium products
          </p>
        </div>
        <ProductFilters products={products} />
      </div>
    </main>
  )
}
