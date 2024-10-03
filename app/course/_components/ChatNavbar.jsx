"use client"
import React, {useContext} from 'react'
import { AiOutlineRobot } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { VscScreenFull } from "react-icons/vsc";
import { LuHistory } from "react-icons/lu";
import { CourseContext } from '../[courseid]/layout';

const ChatNavbar = () => {
  const {chatShow, setchatShow} = useContext(CourseContext);
  return (
    <div>
      <nav className='flex items-center justify-between p-2'>
        <div className='text-slate-500 flex items-center gap-1 cursor-pointer'> <AiOutlineRobot /> ChatBot </div>
        <div className='flex items-center gap-3 text-lg text-slate-500'>
            <div className='cursor-pointer'><IoAddOutline /></div>
            <div className='cursor-pointer'><VscScreenFull /></div>
            <div className='cursor-pointer'><LuHistory /></div>
            <div className='cursor-pointer' onClick={() => setchatShow(!chatShow)}><RxCross2 /></div>
        </div>
      </nav>
      <div className='px-2'>
        <div className='w-full h-[2px] bg-slate-100'></div>
      </div>
    </div>
  )
}

export default ChatNavbar
