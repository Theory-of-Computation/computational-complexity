'use client'

import Header from './layout/header/Header'
import Sidebar from './layout/sidebar/Sidebar'
import Footer from './layout/footer/Footer'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex w-full min-h-screen'>
      <div className='page-wrapper flex w-full'>
        {/* Header/sidebar */}
        <div className='xl:block hidden'>
          <Sidebar />
        </div>
        <div className='body-wrapper w-full bg-background flex flex-col min-h-screen'>
          {/* Top Header  */}
          <Header />
          
          {/* Body Content  */}
          <div className={`container mx-auto md:px-6 py-30 flex-grow`}>{children}</div>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  )
}
