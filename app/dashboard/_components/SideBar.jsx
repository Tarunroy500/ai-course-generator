"use client";
import React from "react";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { AiOutlineRobot } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideBar() {
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <IoHomeOutline />,
      path: "/dashboard",
    },
    {
      id: 1,
      name: "ChatBot",
      icon: <AiOutlineRobot />,
      path: "/dashboard/chatbot",
    },
    {
      id: 1,
      name: "Logout",
      icon: <IoLogOutOutline />,
      path: "/dashboard/logout",
    },
  ];
  const path = usePathname();
  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <h1>LOGO</h1>
      <hr className="my-5" />
      <ul className="flex flex-col gap-2">
        {Menu.map((item, index) => (
          <Link href={item.path} key={index}>
            <li
              key={item.id}
              className={`flex items-center space-x-2 cursor-pointer p-3 hover:bg-slate-500 hover:text-white rounded-md ${
                item.path == path && "bg-slate-500 text-white"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
