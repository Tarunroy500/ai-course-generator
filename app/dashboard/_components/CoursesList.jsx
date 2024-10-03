import React from 'react'
import CourseItemCard from './CourseItemCard'

function CoursesList() {
  return (
    <div >
      <h2 className='font-semibold text-xl'>Previous Created Courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
           <CourseItemCard /> 
           <CourseItemCard /> 
           <CourseItemCard /> 
           <CourseItemCard /> 
           <CourseItemCard /> 
        
      </div>
    </div>
  )
}

export default CoursesList