import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
        <h1>LOGO</h1>
        <UserButton/>
    </div>
  )
}

export default Header