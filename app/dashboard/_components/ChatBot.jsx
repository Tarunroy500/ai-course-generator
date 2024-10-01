"use client"
import React from 'react';
import ChatNavbar from './ChatNavbar';
import ChatBotInput from './ChatBotInput';
import Chat from './Chat';

const ChatBot = () => {
  return (
    <div className='h-full w-full shadow-md max-w-[30vw]'>
      <ChatNavbar />
      <div>
      <Chat />
      <ChatBotInput />
      </div>
    </div>
  )
}

export default ChatBot
