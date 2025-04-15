import { useState } from "react";

export default function SubmitButton({ onClick, children }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent form from instantly submitting
    setLoading(true);

    // Wait 1 second before triggering actual logic
    setTimeout(async () => {
      await onClick(e); // Call the passed in function (from login/register)
      setLoading(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full flex justify-center items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
        dark:bg-primary dark:hover:bg-primdark dark:focus:ring-purple-950 cursor-pointer 
        active:scale-95 transition-transform duration-100 ease-in-out font-mono disabled:opacity-60"
    >
      {loading ? (
        <span className="loader h-4 w-8" />
      ) : (
        children
      )}
    </button>
  );
}