"use client"
import React from 'react';
import { AiOutlineRobot } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { VscScreenFull } from "react-icons/vsc";
import { LuHistory } from "react-icons/lu";
import { IoSend } from "react-icons/io5";

const ChatBot = () => {
  return (
    <div className='h-full w-full shadow-md max-w-[30vw]'>
      <nav className='flex items-center justify-between p-2'>
        <div className='text-slate-500 flex items-center gap-1'> <AiOutlineRobot /> ChatBot </div>
        <div className='flex items-center gap-3 text-lg text-slate-500'>
          <IoAddOutline />
          <VscScreenFull />
          <LuHistory />
          <RxCross2 />
        </div>
      </nav>
      <div className='px-2'>
        <div className='w-full h-[2px] bg-slate-100'></div>
      </div>
      <div className='p-3'>
        <div className='w-full h-[11vh] bg-slate-500 rounded-lg p-2'>
          <input type="text" className='bg-transparent focus:outline-none w-full p-1 caret-white placeholder-gray-300 mb-1' placeholder='Ask Anything, select a text and right click to view commands'/>
          <div className='p-1 pr-3 text-white flex items-center justify-between'>
            <p className='text-sm'>Google Gemini</p>
            <IoSend />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
