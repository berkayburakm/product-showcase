'use client'

export default function ProductError({ reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="mb-4 text-4xl font-bold text-red-600">
        Something went wrong
      </h1>
      <p className="mb-6 text-gray-600">
        {
          "We couldn't load the product details right now. Please try again later."
        }
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 text-white transition bg-red-600 cursor-pointer rounded-xl hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  )
}
