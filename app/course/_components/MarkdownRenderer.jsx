"use client"
import React, { useState, useEffect } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import DOMPurify from 'dompurify';
import '../[courseid]/course.css'

const MarkdownRenderer = ({ markdownContent }) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const processMarkdown = async () => {
      try {
        const processedContent = await remark().use(html).process(markdownContent);
        const sanitizedContent = DOMPurify.sanitize(processedContent.toString());
        setHtmlContent(sanitizedContent);
        console.log(sanitizedContent);
      } catch (error) {
        console.error('Error processing markdown:', error);
      }
    };

    processMarkdown();
  }, [markdownContent]);

  return (
    <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default MarkdownRenderer;
