import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MessageBubble from "../components/MessageBubble";

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

  return (
    <div className="min-h-screen flex bg-gray-50 text-black dark:bg-bg-dark dark:text-white transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-300 dark:bg-[#222325] dark:border-[#222325] p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4 dark:text-white font-mono">Chats</h2>
        <ul className="space-y-2 overflow-y-auto flex-1">
          <li className="bg-primary text-white rounded-md px-3 py-2 cursor-pointer hover:bg-violet-500 transition font-mono">
            New Chat
          </li>
          <li className="bg-gray-200 dark:bg-gray-700 rounded-md px-3 py-2 cursor-pointer hover:bg-violet-500 transition dark:hover:bg-violet-500 font-mono">
            Chat with AI
          </li>
        </ul>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between items-center border-b border-gray-200 dark:border-[#1c1d1f] px-6 py-4 bg-white dark:bg-[#1c1d1f]">
          <h1 className="text-xl font-semibold dark:text-white font-mono">Chat</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold hover:scale-105 transition cursor-pointer"
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