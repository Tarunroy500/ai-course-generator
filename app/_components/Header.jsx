import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Logo from "../../public/icon.png"; // Assuming this is the correct path to your logo image
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm bg-[#111827]">
      {/* Logo Image */}
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" width={40} height={40} /> {/* Adjust size as needed */}
        <h1 className="text-white ml-2">LOGO</h1> {/* Text next to the logo */}
      </div>
      
      {/* Get Started Button */}
      <Link href={"/dashboard"}>
        <Button variant="destructive">Get Started</Button>
      </Link>
    </div>
  );
};

export default Header;
