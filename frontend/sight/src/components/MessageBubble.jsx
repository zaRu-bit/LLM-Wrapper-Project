export default function MessageBubble({ text, sender = "ai" }) {
    const isUser = sender === "user";
  
    return (
      <div
        className={`p-4 rounded-lg w-fit max-w-lg font-mono ${
          isUser
            ? "bg-primary text-white self-end"
            : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white self-start"
        }`}
      >
        {text}
      </div>
    );
  }