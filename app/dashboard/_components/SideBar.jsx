"use client";
import React from "react";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { AiOutlineRobot } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

function SideBar() {
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <IoHomeOutline />,
      path: "/dashboard",
    },
    {
      id: 2, 
      name: "ChatBot",
      icon: <AiOutlineRobot />,
      path: "/dashboard/chatbot",
    },
  ];
  
  const path = usePathname();
  
  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <h1>LOGO</h1>
      <hr className="my-5" />
      <ul className="flex flex-col gap-2">
        {Menu.map((item) => (
          <Link href={item.path} key={item.id}>
            <li
              className={`flex items-center space-x-2 cursor-pointer p-3 hover:bg-slate-500 hover:text-white rounded-md ${
                item.path === path && "bg-slate-500 text-white"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
        
        
        <li className="flex items-center space-x-2 cursor-pointer p-3 hover:bg-slate-500 hover:text-white rounded-md">
          <SignOutButton>
            <button className="flex items-center space-x-2 w-full text-left">
              <IoLogOutOutline />
              <span>Logout</span>
            </button>
          </SignOutButton>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
