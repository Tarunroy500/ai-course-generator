import React from 'react'
import AddNewCourse from './_components/AddNewCourse'

const DashBoard = () => {
  return (
    <div className='flex w-full'>
      <div className='p-10 w-full'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <h2 className='text-gray-500'>Create a course with AI: Design engaging, tailored courses effortlessly with AI-powered tools</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
          <AddNewCourse />
        </div>
      </div>
    </div>
  )
}

export default DashBoard