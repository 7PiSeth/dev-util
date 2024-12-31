import React, { useState } from "react";
import { LuQuote } from "react-icons/lu";
import { FcNext } from "react-icons/fc";
import { Link } from "react-router-dom";

const EncloseValueInSingleQuotes = () => {
  const [inputText, setInputText] = useState(""); // Stores raw input
  const [formattedText, setFormattedText] = useState(""); // Stores formatted result
  const [notification, setNotification] = useState(""); // Notification message

  const formatText = (input) => {
    if (!input) {
      return ""; // Return an empty string if input is null or empty
    }

    return input
      .split("\n")
      .map((line) => {
        const trimmedLine = line.trim();
        return trimmedLine ? `'${trimmedLine}'` : null; // Only add quotes if the line is not empty
      })
      .filter((line) => line !== null) // Filter out any null values (empty lines)
      .join(",\n"); // Join with commas and newlines
  };

  const handleTextChange = (e) => {
    const input = e.target.value;
    setInputText(input); // Update raw input
    setFormattedText(formatText(input)); // Update formatted text
  };

  // Copy formatted text to clipboard and show notification
  const handleCopyToClipboard = () => {
    if (formattedText && formattedText.trim() !== "") {
      navigator.clipboard.writeText(formattedText);
      setNotification("Copied successfully✔️");
      setTimeout(() => setNotification(""), 1000); // Clear notification after 1 second
    } else {
      setNotification("No text to copy❌");
      setTimeout(() => setNotification(""), 1000); // Clear notification after 1 second
    }
  };

  // Count the number of lines in the input text
  const lineCount = inputText
    .trim()
    .split("\n")
    .filter((line) => line.trim()).length;

  return (
    <div
      data-aos="fade-right"
      data-aos-offset="100"
      className="relative flex flex-col items-center"
    >
      <label className="absolute -top-10 left-10 flex gap-4 select-text">
        <LuQuote size={30} />
        Enclose value in single quotes
      </label>
      {/* Notification display */}
      {notification && (
        <div className="absolute p-4 rounded-md dark:light-mode dark-mode  text-center w-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {notification}
        </div>
      )}

      <div className="flex justify-evenly w-full">
        {/* Raw input textarea */}
        <textarea
          className="rounded-lg text-sm w-[45%] h-[85vh]"
          value={inputText}
          onChange={handleTextChange}
          placeholder="Input a list, separated by line breaks"
          autoFocus
        />
        <div className="flex flex-col items-center justify-center gap-7">
          {/* Label displaying line count */}
          <label className="mt-2 text-center">
            Items count: <p className="text-xl">{lineCount}</p>
          </label>
          <Link
            to="/ExtractInformationFromQRCode"
            // class="bg-white bg-opacity-5 rounded-2xl p-6 flex flex-col items-center group relative overflow-hidden transition duration-700 ease-in-out border-transparent border-2 hover:border-white dark:hover:bg-opacity-20 hover:bg-opacity-25 active:scale-105 active:duration-100"
          >
            <FcNext
              className="rounded-lg text-sm border border-transparent cursor-pointer hover:border-blue-500 hover:shadow-md transition-all active:scale-125 duration-200"
              size={40}
            />
          </Link>
        </div>
        {/* Formatted output textarea with hover effect */}
        <textarea
          className="rounded-lg text-sm w-[45%] h-[85vh] border border-transparent cursor-pointer hover:border-blue-500 hover:shadow-md transition-all active:scale-150 duration-500"
          value={formattedText}
          readOnly // Make this textarea read-only
          placeholder="Result"
          onClick={handleCopyToClipboard} // Copy text when clicked
        />
      </div>
    </div>
  );
};

export default EncloseValueInSingleQuotes;
