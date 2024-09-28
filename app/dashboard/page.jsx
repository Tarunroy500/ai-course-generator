"use client"
import React, {useContext} from 'react'
import { DashboardContext } from './layout'
import AddNewCourse from './_components/AddNewCourse'
import ChatBot from './_components/ChatBot'

const DashBoard = () => {
  const {chatShow, setchatShow} = useContext(DashboardContext);
  return (
    <div className='flex w-full'>
      <div className='p-10 w-full'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <h2 className='text-gray-500'>Create a course with AI: Design engaging, tailored courses effortlessly with AI-powered tools</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
          <AddNewCourse />
        </div>
      </div>
      <div className={chatShow ? 'h-[90vh] w-[30vw] transition-all ease-in-out' : 'hidden transition-all ease-in-out'}>
        <ChatBot />
      </div>
    </div>
  )
}

export default DashBoard