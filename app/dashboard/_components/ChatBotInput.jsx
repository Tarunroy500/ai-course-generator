"use client"
import React, { useState, useContext } from 'react'
import { IoSend } from "react-icons/io5";
import { DashboardContext } from '../layout';

const ChatBotInput = () => {
  const [Input, setInput] = useState('');
  const {currentChat, setcurrentChat} = useContext(DashboardContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setcurrentChat(prev => [...prev, {role: 'user', content: Input}]);
    // Function to handle request
    setcurrentChat(prev => [...prev, {role: 'assistant', content: 'Response from the model'}]) // Add content received from API
  }

  return (
    <div>
    <div className='p-3'>
      <form onSubmit={handleSubmit} className='w-full bg-slate-500 rounded-lg p-2'>
        <input value={Input} onChange={(e) => setInput(e.target.value)} type="text" className='bg-transparent focus:outline-none w-full p-1 caret-white placeholder-gray-300 mb-1 text-white' placeholder='Ask Anything, select a text and right click to view commands'/>
        <div className='p-1 pr-3 text-white flex items-center justify-between'>
          <p className='text-sm'>Google Gemini</p>
          <button type="submit"><IoSend /></button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default ChatBotInput
