"use client"
import React from "react";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Logo from "../../../public/icon.png";

function SideBar() {

  const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src={Logo} alt="Logo" width={90} height={90} /> {/* Adjust size as needed */}
      <hr className="my-5" />
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
