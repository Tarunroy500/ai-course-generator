// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import MarkdownRenderer from "./MarkdownRenderer";
// import axios from "axios";

// function ChapterContent() {
//   const [MarkdownContent, setMarkdownContent] = useState("");

//   const params = useParams();
//   const { courseid } = params;
//   console.log(courseid);

//   useEffect(() => {
//     async function getData(_id) {
//       try {
//         const response = await axios.get('/api/data', {
//           _id: courseid
//         }, {

//         })
//       } catch (error) {

//       }
//     }

//     // getData(courseid);
//   }, []);

//   return (
//     <div className="px-10 bg-white rounded-lg max-w-screen mx-auto overflow-y-auto">
//       <MarkdownRenderer MarkdownContent={MarkdownContent} />
//     </div>
//   );
// }

// export default ChapterContent;
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MarkdownRenderer from "./MarkdownRenderer";
import axios from "axios";

// Popup Component
const Popup = ({ x, y, onClose }) => {
  const [showLanguages, setShowLanguages] = useState(false); // State to control the language dropdown

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
          Sent to Chat
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

function ChapterContent() {
  const [popup, setPopup] = useState({ isVisible: false, x: 0, y: 0 });
  const [MarkdownContent, setMarkdownContent] = useState("");

  const params = useParams();
  const { courseid } = params;

  useEffect(() => {
    async function getData(_id) {
      try {

        const response = await axios.get(
          "/api/data",
          {
            params: { _id: courseid },
          }
        );
        setMarkdownContent(response.data.markdown); // Assuming the response has the markdown content
      } catch (error) {
        console.error("Error fetching data:", error);

      }
    }

    // getData(courseid);
  }, [courseid]);

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
    <div
      className="p-10 bg-white rounded-lg max-w-4xl mx-auto my-8"
      onMouseUp={handleMouseUp}
    >
      <h2 className="font-bold text-3xl text-blue-600 mb-4">Chapter Name</h2>
      <p className="text-gray-700 leading-relaxed text-lg">
        This is a detailed description of the chapter. The content can go into
        more depth, explaining the key points, and giving the reader an overview
        of what they will learn in this chapter. Make it engaging and concise.
      </p>
      <MarkdownRenderer MarkdownContent={MarkdownContent} />
      {popup.isVisible && (
        <Popup x={popup.x} y={popup.y} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default ChapterContent;

