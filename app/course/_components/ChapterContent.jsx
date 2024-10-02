import React from 'react'
import MarkdownRenderer from './MarkdownRenderer';

function ChapterContent() {

  const markdownContent = `
  # Hello World
  This is some **Markdown** content.
  
  ## Features
  - Feature 1
  - Feature 2

  [Visit Google](https://www.google.com)
  `;

  return (
    <div className='p-10 bg-white  rounded-lg max-w-4xl mx-auto my-8'>
      <h2 className='font-bold text-3xl text-blue-600 mb-4'>
        Chapter Name
      </h2>
      <p className='text-gray-700 leading-relaxed text-lg'>
        This is a detailed description of the chapter. The content can go into
        more depth, explaining the key points, and giving the reader an overview
        of what they will learn in this chapter. Make it engaging and concise.
      </p>
      <MarkdownRenderer markdownContent={markdownContent}/>
    </div>
  )
}

export default ChapterContent;
