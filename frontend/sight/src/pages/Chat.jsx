import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MessageBubble from "../components/MessageBubble";
import ChatTab from "../components/ChatTab";

export default function Chat() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const username = localStorage.getItem("user") || "U";
  const initial = username[0].toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  const messages = [
    { id: 1, text: "Hello! How can I help you today?", sender: "ai" },
    { id: 2, text: "I need help with my code.", sender: "user" },
  ];
  const [chats, setChats] = useState([
    { id: 1, label: "New Chat 1" },
    { id: 2, label: "New Chat 2" },
  ]);
  
  const handleAddChat = () => {
    if (chats.length < 10) {
      const newId = Date.now(); // Unique id
      setChats([...chats, { id: newId, label: `New Chat ${chats.length + 1}` }]);
    }
  };
  
  const handleDeleteChat = (id) => {
    setChats(chats.filter((chat) => chat.id !== id));
  };
  const handleRenameChat = (id, newLabel) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, label: newLabel } : chat
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-black dark:bg-bg-dark dark:text-white transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-300 dark:bg-[#222325] dark:border-[#222325] p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4 dark:text-white font-mono">Chats</h2>

        {/* Chat list */}
        <ul className="space-y-2 overflow-y-auto flex-1">
          {chats.map((chat) => (
            <ChatTab
              key={chat.id}
              label={chat.label}
              onDelete={() => handleDeleteChat(chat.id)}
              onRename={(newLabel) => handleRenameChat(chat.id, newLabel)}
            />
          ))}
        </ul>

        {/* Add new chat */}
        <button
          onClick={handleAddChat}
          disabled={chats.length >= 10}
          title={chats.length >= 10 ? "Max of 10 chats" : ""}
          className={`mt-4 px-3 py-2 rounded-md text-sm font-mono transition active:scale-95 transition-transform duration-100 ease-in-out
            ${
              chats.length >= 10
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-violet-500 cursor-pointer"
            }`}
        >
          + New Chat
        </button>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between items-center border-b border-gray-200 dark:border-[#1c1d1f] px-6 py-4 bg-white dark:bg-[#1c1d1f]">
          <h1 className="text-xl font-semibold dark:text-white font-mono">Chat</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold hover:scale-105 transition cursor-pointer text-2xl font-mono
              active:scale-95 transition-transform duration-100 ease-in-out"
              title={username}
            >
              {initial}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#2b2d30] border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg font-mono cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-100 dark:bg-[#2b2d30] transition-colors duration-200">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
        </div>

        {/* Input */}
        <form className="border-t border-gray-200 dark:border-[#1c1d1f] p-4 flex bg-white dark:bg-[#1c1d1f]">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-lg bg-gray-100 text-black dark:bg-[#1c1d1f] dark:text-white outline-none focus:ring-2 focus:ring-violet-500 font-mono"
          />
          <button
            type="submit"
            className="ml-4 px-4 py-2 rounded-lg text-white hover:bg-violet-500 transition cursor-pointer font-mono"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}