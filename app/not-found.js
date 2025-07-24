import Link from 'next/link'
import { TbError404 } from 'react-icons/tb'
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-12 text-center rounded-2xl">
        <TbError404 className="mx-auto mb-6 text-gray-300 text-7xl dark:text-gray-600" />
        <h2 className="mb-3 text-3xl font-bold text-gray-800 dark:text-white">
          This page is not found
        </h2>
        <p className="mb-8 text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist.
        </p>

        <Link href="/">
          <button className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg cursor-pointer bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600">
            Go back to home
          </button>
        </Link>
      </div>
    </div>
  )
}
