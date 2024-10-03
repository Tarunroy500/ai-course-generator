"use client"
import React,{useState,useEffect} from 'react'
import CourseItemCard from './CourseItemCard'
import axios from 'axios'

 function CoursesList() {
  const [courseList, setCourseList] = useState([])
  useEffect(()=>{
    const FetchAllCourses = async()=>{
      try{
        const response = await axios.get(
          "/api/course",
          
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        if(response.status === 200 || response.status === 201){
          console.log(response.data.course);
          
          setCourseList(response.data.course)
        }
      }catch{
  
      }
    }
    FetchAllCourses();
  },[])
  return (
    <div >
      <h2 className='font-semibold text-xl'>Previous Created Courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {courseList.slice().reverse().map((course,index)=>{
          return <CourseItemCard key={index} course={course}/>
        })}
           
        
      </div>
    </div>
  )
}

export default CoursesList