"use client";
import React, { useEffect, useState, useContext } from "react";
import ChapterContent from "../_components/ChapterContent";
import { CourseContext } from "./layout";
import ChatBot from "../_components/ChatBot";
import axios from 'axios';

// Popup Component
const Popup = ({ x, y, onClose, selectedText, setSelectedText }) => {
  const [showLanguages, setShowLanguages] = useState(false); // State to control language dropdown
  const { chatShow, setchatShow,currentChat, setcurrentChat, Loading, setLoading } = useContext(CourseContext);

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

  const handleSendToChat = async() => {

    setchatShow(true);

    // Add your logic to send the selected text to the chat
    setcurrentChat([...currentChat, { role: "user", content: selectedText }]);
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/details",
        {
          details: {
            title: selectedText,
            type: 1,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        setcurrentChat((prev) => [
          ...prev,
          { role: "Assistant", content: response.data.chatResponse },
        ]); // Add content received from API
        // Redirect to course page or perform other actions as needed
      }
    } catch (error) {
      alert(error.message);
    }
    
    setSelectedText("");
     // Clear selected text after sending
     // Show chat if it's hidden
    onClose(); // Close the popup
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
          onClick={handleSendToChat}
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

function StartCourse() {
  const [popup, setPopup] = useState({ isVisible: false, x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState(""); // New state to hold the selected text
  const { chatShow } = useContext(CourseContext);

  const handleMouseUp = () => {
    const text = window.getSelection().toString();
    if (text) {
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text); // Store the selected text
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
      {/* Chapter Content and Popup */}
      <div className="h-[88vh] flex gap-3" onMouseUp={handleMouseUp}>
        <div className="py-5 overflow-y-auto"><ChapterContent /></div>
        {popup.isVisible && (
          <Popup
            x={popup.x}
            y={popup.y}
            onClose={handleClosePopup}
            selectedText={selectedText} // Pass selected text to Popup
            setSelectedText={setSelectedText} // Pass setter function
          />
        )}
        <div
          className={
            chatShow
              ? "h-[87vh] w-[30vw] transition-all ease-in-out"
              : "hidden transition-all ease-in-out"
          }
        >
          <ChatBot />
        </div>
      </div>
    </div>
  );
}

export default StartCourse;
