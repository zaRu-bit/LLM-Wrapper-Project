import { useState } from "react";

export default function ChatTab({ label, onDelete, onRename }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);

  const handleRename = () => {
    if (editValue.trim()) {
      onRename(editValue.trim());
    }
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 rounded-md px-3 py-2 text-sm font-mono cursor-pointer hover:bg-violet-500 transition ">
      {isEditing ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRename();
          }}
          autoFocus
          className="flex-1 mr-2 bg-gray-700/50 text-black dark:text-white outline-none hover:bg-gray-700/50"
        />
      ) : (
        <span
          className="inline-block rounded px-1 hover:bg-gray-700/50 transition"
          onClick={() => setIsEditing(true)}
          title="Click to rename"
        >
          {label}
        </span>
      )}
      <button
        onClick={onDelete}
        className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
        title="Delete chat"
      >
        ✕
      </button>
    </li>
  );
}