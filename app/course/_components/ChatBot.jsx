"use client"
import React, { useRef, useEffect } from 'react';
import ChatNavbar from './ChatNavbar';
import ChatBotInput from './ChatBotInput';
import Chat from './Chat';

const ChatBot = () => {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth', // Makes scrolling smooth
      });
    }
  });

  return (
    <div className='h-full w-full shadow-md min-w-[18vw]'>
      <ChatNavbar />
      <div ref={chatRef} className='h-[94%] overflow-y-auto'>
      <Chat />
      <ChatBotInput />
      </div>
    </div>
  )
}

export default ChatBot
