"use client";
import React, { useState, useContext } from "react";
import { IoMic, IoSend } from "react-icons/io5";
import { CourseContext } from "../[courseid]/layout";
import { LoaderCircle } from "lucide-react";
import { FaMicrophone } from "react-icons/fa6";
import axios from 'axios';

const ChatBotInput = () => {
  const [Input, setInput] = useState("");
  const [Loading, setLoading] = useState(false);
  const { currentChat, setcurrentChat } = useContext(CourseContext);

  const handleSubmit = async (e) => {
    setInput("");
    setLoading(true);
    e.preventDefault();
    setcurrentChat((prev) => [...prev, { role: "User", content: Input }]);

    try {
      const response = await axios.post(
        "/api/details",
        {
          details: {
            title: Input,
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
        console.log("the response is : ", response);
        setcurrentChat((prev) => [
          ...prev,
          { role: "Assistant", content: response.data.chatResponse },
        ]); // Add content received from API
        // Redirect to course page or perform other actions as needed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
    <div className='p-3'>
      <form onSubmit={handleSubmit} className='w-full bg-slate-500 rounded-lg p-2'>
        <input value={Input} onChange={(e) => setInput(e.target.value)} type="text" className='bg-transparent focus:outline-none w-full p-1 caret-white placeholder-gray-300 mb-1 text-white' placeholder='Ask Anything, select a text and right click to view commands'/>
        <div className='p-1 pr-3 text-white flex items-center justify-between'>
          <p className='text-sm'>Google Gemini</p>
          <div className='flex justify-between gap-6'>
            <button type="submit"><FaMicrophone /></button>
            <button type="submit">{!Loading ? <IoSend /> : <LoaderCircle className="animate-spin"/>}</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ChatBotInput;
