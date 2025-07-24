import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Providers from './providers'
import { Toaster } from 'react-hot-toast'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Product Showcase',
  description: 'A showcase of products',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.className}>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </Providers>
      </body>
    </html>
  )
}
