import React from 'react'

function ChapterListCard() {
  return (
    <div className='grid grid-cols-5 p-4 items-center border-b bg-white hover:bg-blue-50 transition-shadow duration-300 shadow-sm rounded-lg cursor-pointer'>
      <div>
        <h2 className='p-2 bg-blue-600 text-white rounded-full text-center w-10 h-10'>1</h2>
      </div>
      <div className='col-span-4'>
        <h2 className='font-semibold text-gray-800'>Chapter Name</h2>
        <h2 className='text-gray-500'>10 minutes</h2>
      </div>
    </div>
  )
}

export default ChapterListCard;
