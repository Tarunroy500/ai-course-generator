"use client";
import React, { useState, useContext } from "react";
import { DashboardContext } from "../layout";
import FormattedTextComponent from "./FormattedTextComponent";

const Chat = () => {
  const { currentChat, setcuurentChat } = useContext(DashboardContext);

  return (
    <div className="p-3 pb-0">
      {currentChat.map((chat) => {
        return (
          <div
            className={
              "mr-auto bg-slate-200 mb-1 w-[95%] rounded-lg p-2 text-sm"
            }
          >
            <div
              className={
                chat.role === "Assistant"
                  ? "text-amber-400 font-semibold"
                  : "text-sky-500 font-semibold"
              }
            >
              {chat.role}
            </div>
            <div className="text-slate-500 chatBot"><FormattedTextComponent content={chat.content} /></div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
