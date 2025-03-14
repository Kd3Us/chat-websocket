import React from "react";

const ChatApp = () => {
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <div className="w-1/4 bg-gray-900 p-4">
        <h2 className="text-lg font-bold mb-4">Chats</h2>
        <ul>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
            <span className="w-8 h-8 bg-gray-500 rounded-full mr-3"></span>
            Mathys 👍🏼
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
            <span className="w-8 h-8 bg-gray-500 rounded-full mr-3"></span>
            Jules Sorrentino
          </li>
        </ul>
      </div>
      
      <div className="flex-1 flex flex-col bg-gray-700">
        <div className="p-4 bg-gray-800 text-center font-bold text-xl">Ryan Mendy</div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-500 rounded-full mr-2"></div>
            <div className="bg-red-300 text-black p-3 rounded-lg max-w-xs">This is a text message</div>
          </div>
          <div className="flex items-center justify-end">
            <div className="bg-red-300 text-black p-3 rounded-lg max-w-xs">This is another text message</div>
            <div className="w-10 h-10 bg-gray-500 rounded-full ml-2"></div>
          </div>
        </div>

        <div className="p-4 bg-red-300">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-3 bg-gray-900 text-white rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
