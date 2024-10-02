"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MarkdownRenderer from "./MarkdownRenderer";
import axios from "axios";

function ChapterContent() {
  const [MarkdownContent, setMarkdownContent] = useState("");

  const params = useParams();
  const { courseid } = params;
  console.log(courseid);

  useEffect(() => {
    async function getData(_id) {
      try {
        const response = await axios.get('/api/data', {
          _id: courseid
        }, {
          
        })
      } catch (error) {
        
      }
    }

    getData(courseid);
  }, []);

  return (
    <div className="px-10 bg-white rounded-lg max-w-screen mx-auto overflow-y-auto">
      <MarkdownRenderer MarkdownContent={MarkdownContent} />
    </div>
  );
}

export default ChapterContent;
