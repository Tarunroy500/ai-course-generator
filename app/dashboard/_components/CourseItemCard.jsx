import React from 'react'
import { Button } from "@/components/ui/button";

function CourseItemCard() {
  return (
    <div className="border border-gray-200 shadow-md rounded-lg p-5 bg-white">
      <h2 className="font-bold text-lg text-blue-600">Internet Of Things</h2>
      <h2 className="text-gray-600 text-sm mt-1">Advanced</h2>
      <h2 className="text-sm text-gray-600 mt-2">
        Duration: <span className="text-blue-400 ">4 Weeks</span>
      </h2>
      <h2 className="text-xs text-gray-400 mt-1">
        Created At: <span className="text-gray-600">Sep 15, 2023</span>
      </h2>
      <div className="flex justify-end mt-4 gap-3">
        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Revisit Content
        </Button>
      </div>
    </div>
  )
}

export default CourseItemCard;
