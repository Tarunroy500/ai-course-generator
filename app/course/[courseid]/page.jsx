"use client"
import React, { useEffect } from "react";
import ChapterListCard from "../_components/ChapterListCard";
import ChapterContent from "../_components/ChapterContent";
import Header from "../_components/Header";
import { useRouter } from 'next/navigation'

function StartCourse({params}) {
    
    const router = useRouter();
  return (
    <div>
    <Header onBack={() => router.push("/dashboard")} />
    <div className="flex">
      <div className="fixed md:w-72 hidden md:block h-screen border-t border-r bg-white shadow-md">
        <h2 className="font-semibold text-2xl p-4 border-b text-blue-600 border-gray-300">
          Course Name
        </h2>
        <div className="overflow-y-auto">
          <ChapterListCard />
          <ChapterListCard />
          <ChapterListCard />
          
        </div>
      </div>
      <div className="md:ml-72">
        <ChapterContent />
      </div>
    </div>
    </div>
  );
}

export default StartCourse;
