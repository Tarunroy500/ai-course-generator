import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Logo from "../../public/logo.webp" 


const Header = () => {
  return (
    <div className='flex justify-between p-5 shadow-sm bg-[#111827]'>
        <h1 className='text-white'>LOGO</h1>
        <Button variant="destructive">Get Started</Button>
    </div>
  )
}

export default Header