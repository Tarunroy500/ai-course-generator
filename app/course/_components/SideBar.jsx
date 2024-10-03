"use client";
import React, { useContext } from "react";
import { CourseContext } from "../[courseid]/layout";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { AiOutlineRobot } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Logo from "../../../public/icon.png";

function SideBar() {
  const { chatShow, setchatShow } = useContext(CourseContext);

  const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <div className="flex items-center gap-3">
      <Image src={Logo} alt="Logo" width={60} height={60} />
      <div className="text-xl font-sans font-semibold">IntelliCourse</div>  
      </div>
      <hr className="my-3" />
      <ul className="flex flex-col gap-2">
        <Link href={'/dashboard'}>
          <li
            className={`flex items-center space-x-2 cursor-pointer p-3 hover:bg-slate-500 hover:text-white rounded-md ${'/dashboard' === path && "bg-slate-500 text-white"
              }`}
          >
            <IoHomeOutline />
            <span>Home</span>
          </li>
        </Link>

        <li className={`flex items-center space-x-2 cursor-pointer p-3 hover:bg-slate-500 hover:text-white rounded-md ${chatShow && "bg-slate-500 text-white"}`}>
          <button className="flex items-center space-x-2 w-full text-left" onClick={() => setchatShow(!chatShow)}>
            <AiOutlineRobot />
            <span>ChatBot</span>
          </button>
        </li>

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
