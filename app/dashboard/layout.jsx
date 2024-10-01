"use client"
import React from "react";
import { useState, createContext } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

export const DashboardContext = createContext();

function DashBoardLayout({ children }) {
  const [chatShow, setchatShow] = useState(false);
  const [currentChat, setcurrentChat] = useState([]);
  return (
    <DashboardContext.Provider value={{ chatShow, setchatShow, currentChat, setcurrentChat }}> 
    <div>
      <div className="md:w-64 hidden md:block">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <Header/>
        {children}
        </div>
    </div>
    </DashboardContext.Provider>
  );
}

export default DashBoardLayout;
