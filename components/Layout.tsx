import "../styles/globals.css"
import Header from "@/components/ui/header/Header"
import Footer from "@/components/ui/footer/Footer"

type LayoutProps = {
    children?: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
    return (
      <>
      <div className="flex flex-col w-full flex-1 h-full border-0">
        <Header />
        <main id="layout-main" className='flex flex-col flex-1 flex-grow w-full items-start justify-start border-0 border-yellow-500 overflow-hidden'>
            {children}
        </main>
        <Footer />
      </div>
      </>
    )
  }