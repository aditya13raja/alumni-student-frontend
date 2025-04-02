import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, PhoneCall, Video } from "lucide-react";

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [searchTerm, setSearchTerm] = useState(""); // State to track search input

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch("/api/chats");
      const data = await response.json();
      console.log("Fetched Chats:", data); // Debugging
      setChats(data);
      if (data.length > 0) setActiveChat(data[0]);
    };
    fetchChats();
  }, []);
  

  useEffect(() => {
    if (!activeChat) return;
    const fetchMessages = async () => {
      const response = await fetch(`/api/messages/${activeChat.id}`);
      const data = await response.json();
      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeChat.id]: data,
      }));
    };
    fetchMessages();
  }, [activeChat]);

  const sendMessage = async () => {
    if (input.trim() === "") return;
    const newMessage = {
      username: "You",
      msg_content: input,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(`/api/messages/${activeChat.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });

    if (response.ok) {
      setMessages({
        ...messages,
        [activeChat.id]: [...(messages[activeChat.id] || []), newMessage],
      });
      setInput("");
    } else {
      console.error("Failed to send message");
    }
  };

  const initiateCall = (type) => {
    alert(`${type} Call Feature Coming Soon!`);
  };

  const filteredChats = chats.filter((chat) =>
    chat.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (chat.username && chat.username.toLowerCase().includes(searchTerm.toLowerCase())) // Handle missing username
  );

  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <div className={`w-1/4 p-6 border-r shadow-lg rounded-lg m-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold mb-6">Chats</h2>

        {/* Search Bar */}
        <div className="mb-4">
        <input
          type="text"
          placeholder="Search Chats..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            console.log("Search Input:", e.target.value); // Debugging
            setSearchTerm(e.target.value);
        }} 
        />
        </div>

        {/* Chats List */}
        {filteredChats.length === 0 ? (
          <p className="text-gray-500">No chats found</p>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 cursor-pointer rounded-lg mb-4 transition duration-300 ease-in-out transform hover:scale-105 ${
                activeChat?.id === chat.id ? "bg-blue-500 text-white" : theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <span className="font-semibold">{chat.topic}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Window */}
      <div className={`w-3/4 flex flex-col rounded-lg shadow-lg m-6 overflow-hidden ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <div className={`p-6 font-semibold text-xl flex justify-between items-center ${theme === "dark" ? "bg-blue-700 text-white" : "bg-blue-500 text-white"}`}>
          {activeChat ? activeChat.topic : "Select a chat"}
          <div className="flex space-x-4">
            <button onClick={() => initiateCall("Audio")} className="hover:text-gray-300">
              <PhoneCall size={24} />
            </button>
            <button onClick={() => initiateCall("Video")} className="hover:text-gray-300">
              <Video size={24} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className={`flex-1 p-6 overflow-y-auto ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
          {messages[activeChat?.id]?.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 flex ${msg.username === "You" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-md p-4 rounded-lg shadow-lg ${msg.username === "You" ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}>
                <p className="text-sm">{msg.msg_content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Field */}
        <div className={`p-6 border-t flex items-center space-x-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
          <input
            type="text"
            className="flex-1 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
