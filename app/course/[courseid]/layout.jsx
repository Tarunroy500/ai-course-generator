"use client"
import React from "react";
import Header from "../_components/Header";
import SideBar from "../_components/SideBar";
import { useState, createContext } from "react";

export const CourseContext = createContext();

function CourseLayout({ children }) {
  const [chatShow, setchatShow] = useState(false);
  const [currentChat, setcurrentChat] = useState([]);
  return (
    <CourseContext.Provider value={{ chatShow, setchatShow, currentChat, setcurrentChat }}> 
    <div>
      <div className="md:w-64 hidden md:block">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <Header/>
        {children}
        </div>
    </div>
    </CourseContext.Provider>
  );
}

export default CourseLayout;