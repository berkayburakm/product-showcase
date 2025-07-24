import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center h-screen flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
      <p className="mb-8">Could not find the product you were looking for.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  )
} 