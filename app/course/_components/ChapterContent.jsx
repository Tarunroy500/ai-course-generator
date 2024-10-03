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
import { CourseContext } from "../[courseid]/layout";

// Popup Component


function ChapterContent() {
  const [popup, setPopup] = useState({ isVisible: false, x: 0, y: 0 });
  const [MarkdownContent, setMarkdownContent] = useState("");
  const [loading, setloading] = useState(false);

  const params = useParams();
  const { courseid } = params;
  

  useEffect(() => {
    async function getData(_id) {
      try {
        const response = await axios.post("/api/course", {
          _id: _id
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        })

        if(response.status === 200 || response.status === 201) {
          setMarkdownContent(response.data.course);
        }
      } catch (error) {
        console.error("Error fetching data:", error);

      }
    }

    getData(courseid);
  }, [courseid]);

  
  console.log(MarkdownContent)

  return (
    <div className="px-10 bg-white rounded-lg max-w-screen mx-auto overflow-y-auto">
      {
        loading ? <div className="text-9xl font-bold">Loading............</div> :
        <MarkdownRenderer MarkdownContent={MarkdownContent} />
      }
    </div>
  );
}

export default ChapterContent;

