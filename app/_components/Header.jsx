import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Logo from "../../public/icon.png";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between p-5 shadow-sm bg-[#111827]">
      <h1 className="text-white">LOGO</h1>
      <Link href={"/dashboard"}>
        <Button variant="destructive">Get Started</Button>
      </Link>
    </div>
  );
};

export default Header;
