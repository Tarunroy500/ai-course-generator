import React from "react";

const formatTextToHTML = (text) => {
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  const lines = formattedText.split("\n");
  const listItems = lines.map((line) => {
    if (line.trim().startsWith("* ")) {
      return `<li>${line.trim().substring(2)}</li>`;
    }
    return `<p>${line}</p>`;
  });

  //   formattedText = listItems.join('');
  //   if (formattedText.includes('<li>')) {
  //     formattedText = `<ul>${formattedText}</ul>`;
  //   }
  let newText = "";

  formattedText = listItems.map((line) => {
    if (line.trim().startsWith("<li>")) {
      return (newText += `<ul>${line}</ul>`);
    } else {
      return (newText += line);
    }
  });

  return newText;
};

const FormattedTextComponent = ({ content }) => {
  return (
    <div
      className="formatted-text"
      style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5em" }}
      dangerouslySetInnerHTML={{ __html: formatTextToHTML(content) }}
    />
  );
};

export default FormattedTextComponent;
