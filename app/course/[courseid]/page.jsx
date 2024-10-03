"use client";
import React, { useEffect, useState, useContext } from "react";
import ChapterListCard from "../_components/ChapterListCard";
import ChapterContent from "../_components/ChapterContent";
import Header from "../_components/Header";
import { useRouter, usePathname } from "next/navigation";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { AiOutlineRobot } from "react-icons/ai";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { DashboardContext } from "@/app/dashboard/layout";

// Popup Component
const Popup = ({ x, y, onClose }) => {
  const [showLanguages, setShowLanguages] = useState(false); // State to control language dropdown

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "zh", label: "Chinese" },
    { code: "ar", label: "Arabic" },
  ];

  const handleTranslate = (language) => {
    alert(`Translating to ${language.label}`);
    setShowLanguages(false); // Hide the dropdown after selecting a language
  };

  return (
    <div
      className="absolute border border-gray-300 bg-white rounded-lg p-4 shadow-lg z-50 transition-opacity duration-200"
      style={{
        top: y,
        left: x,
      }}
      onMouseLeave={onClose}
    >
      <div className="flex flex-col gap-2">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          onClick={() => alert("Sent to Chat Selected")}
        >
          Send to Chat
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          onClick={() => alert("Text to Speech Selected")}
        >
          Text to Speech
        </button>

        {/* Translate Button */}
        <div className="relative">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={() => setShowLanguages(!showLanguages)} // Toggle dropdown
          >
            Translate
          </button>

          {/* Language Dropdown */}
          {showLanguages && (
            <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-40">
              {languages.map((language) => (
                <button
                  key={language.code}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200"
                  onClick={() => handleTranslate(language)}
                >
                  {language.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function StartCourse({ params }) {
  const router = useRouter();
  const path = usePathname();
  const [popup, setPopup] = useState({ isVisible: false, x: 0, y: 0 });

  const handleMouseUp = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setPopup({
        isVisible: true,
        x: rect.x + window.scrollX,
        y: rect.y + window.scrollY - 60, // Adjusted to show the popup above the selection
      });
    } else {
      setPopup({ isVisible: false, x: 0, y: 0 });
    }
  };

  const handleClosePopup = () => {
    setPopup({ isVisible: false, x: 0, y: 0 });
  };

  return (
    <div>
      <Header onBack={() => router.push("/dashboard")} />
      <div className="flex mt-20">
        <div className="fixed md:w-72 hidden md:block h-screen border-t border-r bg-white shadow-md">
          <div className="fixed h-full md:w-64 p-5 shadow-md">
            <hr className="my-5" />
            <ul className="flex flex-col gap-2">
              <Link href={"/dashboard"}>
                <li
                  className={`flex items-center space-x-2 cursor-pointer p-3 hover:bg-slate-500 hover:text-white rounded-md ${
                    "/dashboard" === path && "bg-slate-500 text-white"
                  }`}
                >
                  <IoHomeOutline />
                  <span>Home</span>
                </li>
              </Link>

              <li className={`flex items-center space-x-2 cursor-pointer p-3 hover:bg-slate-500 hover:text-white rounded-md `}>
                <button className="flex items-center space-x-2 w-full text-left">
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
        </div>

        {/* Chapter Content and Popup */}
        <div className="md:ml-72 max-h-[88vh] overflow-y-auto py-5" onMouseUp={handleMouseUp}>
          <ChapterContent />
          {popup.isVisible && (
            <Popup x={popup.x} y={popup.y} onClose={handleClosePopup} />
          )}
        </div>
      </div>
    </div>
  );
}

export default StartCourse;
