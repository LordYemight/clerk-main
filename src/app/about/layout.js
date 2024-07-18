import Header from '@/components/layout/Header';
import React from 'react'

const Layout = ({children}) => {
    return (
      <div className=''>
        <div className='w-full' >
          <Header />
          {children}
        </div>
      </div>
    )
  }
  
  export default Layout;