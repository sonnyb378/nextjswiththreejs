import './globals.css'
import Header from '@/components/ui/header/Header'
import Footer from '@/components/ui/footer/Footer'
// import { StrictMode } from 'react'

export const metadata = {
  title: 'R3F',
  description: 'ThreeJS + NextJS with React-Three-Fiber Practice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <StrictMode>
      <html lang="en">
        <body style={{ width:"100%", height:"100%"}} className="flex flex-col relative bg-black text-slate-100 border-0 border-violet-500">
          <Header />
          <main id="layout-main" className='flex flex-col flex-1 flex-grow w-full items-start justify-start border-0 border-yellow-500 overflow-hidden'>
            {children}
          </main> 
          <Footer />       
        </body>
      </html>
    // </StrictMode>
  )
}
