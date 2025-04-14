import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
  
      // Store the token and username
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", data.username);
  
      navigate("/chat"); // or "/chat"
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-background min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-background dark:border-gray-700 shadow-xl shadow-indigo-400/40">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center font-mono">
            Sign in to your account
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  focus:outline-none focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-indigo-400 dark:focus:border-indigo-400 font-mono"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-mono">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  focus:outline-none focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-indigo-400 dark:focus:border-indigo-400 font-mono"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-red-500 font-medium text-center font-mono">{error}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
              text-center dark:bg-primary dark:hover:bg-primdark dark:focus:ring-purple-950 cursor-pointer hover:animate-pulse font-mono"
            >
              Sign in
            </button>

            {/* Register link */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center font-mono">
              Don’t have an account?{" "}
              <a href="/register" className="font-medium text-primary hover:underline dark:text-primary font-mono">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}