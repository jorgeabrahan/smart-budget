import { Poppins } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function LayoutHome({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
