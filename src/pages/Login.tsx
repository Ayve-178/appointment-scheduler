import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }

    console.log("Form Submitted", username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-[20px] sm:px-[80px] lg:px-[250px]">
      <form
        onSubmit={handleSubmit}
        className="w-[70%] sm:w-[40%] p-8 border rounded-lg shadow-lg"
      >
        <h2 className="text-[25px] font-bold text-center">Sign in</h2>
        <div className="text-[10px] text-center text-gray-500 mb-5">
          Sign in to book an appointment
        </div>
        <div className="relative z-0">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none mb-2 dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
          />
          <label
            htmlFor="username"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-70 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-focus:dark:text-black peer-focus:text-md peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Username
          </label>
        </div>

        <div className="relative z-0">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none mb-3 dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-70 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-focus:dark:text-black peer-focus:text-md peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-3 text-white text-md bg-gray-800 hover:bg-black rounded-md focus:ring-0"
        >
          Sign in
        </button>
        {error && (
          <div className="text-red-500 text-[12px] text-center mt-2">{error}</div>
        )}
        <div className="text-[12px] text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <Link to="/registration" className="text-gray-900 underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
