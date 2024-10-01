"use client"
import React, { useState } from 'react'

const Chat = () => {
    const [chatContent, setchatContent] = useState([
        {
            "id" : 1,
            "role" : "User",
            "content" : "Hello, I'm a user"
        },
        {
            "id" : 2,
            "role" : "Assistant",
            "content" : "Hi, I'm an assistant. How can I help you today?"
        },
        {
            "id" : 3,
            "role" : "User",
            "content" : "I'm having trouble with my course"
        },
        {
            "id" : 4,
            "role" : "Assistant",
            "content" : "I'd be happy to help with that, the issue here is due to the less context of your problem. Could you please provide more details about the course and the specific problem you're facing?. and also, the time frame you're facing this issue."
        }
    ])
  return (
    <div className='p-3 pb-0'>
      {
        chatContent.map((chat) => {
            return (<div className={'mr-auto bg-slate-200 mb-1 w-[95%] rounded-lg p-2 text-sm'} key={chat.id}>
                <div className={chat.role === 'Assistant' ? 'text-amber-400 font-semibold' : 'text-sky-500 font-semibold'}>{chat.role}</div>
                <div className='text-slate-500'>{chat.content}</div>
            </div>);
        })
      }
    </div>
  )
}

export default Chat
