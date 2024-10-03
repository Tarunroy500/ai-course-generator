import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from "next/image";
import Logo from "../../../public/icon.png"; // Assuming this is the correct path to your logo image

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
        <Image src={Logo} alt="Logo" width={70} height={70} /> {/* Adjust size as needed */}
        <UserButton/>
    </div>
  )
}

export default Header