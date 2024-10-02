"use client"
import React, { useRef, useEffect } from 'react';
import ChatNavbar from './ChatNavbar';
import ChatBotInput from './ChatBotInput';
import Chat from './Chat';

const ChatBot = () => {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollBottom = chatRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className='h-full w-full shadow-md max-w-[30vw]'>
      <ChatNavbar />
      <div ref={chatRef} className='h-[90%] overflow-y-auto'>
      <Chat />
      <ChatBotInput />
      </div>
    </div>
  )
}

export default ChatBot
