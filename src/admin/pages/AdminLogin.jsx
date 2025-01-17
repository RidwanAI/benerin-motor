import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  // Function -> Navigate URL
  const navigate = useNavigate();

  // Function -> Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      setError("");
      alert("Login Successful!");
    } else {
      setError("Invalid Email or Password!");
    }
  };

  return (
    <div className="bg-slate-100 flex font-font-poppins items-center justify-center min-h-screen">
      <div className="bg-white max-w-md mx-3 p-3 rounded-sm shadow-sm space-y-3 w-full">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-slate-700">
          <p className="flex font-bold items-center justify-center text-2xl">Administrator</p>
          <p className="flex font-bold items-center justify-center text-2xl">Benerin Motor Studio</p>
        </div>

        {/* Fitur -> Form Login */}
        <form onSubmit={handleLogin} className="space-y-3">
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-1 text-center">{error}</p>}

          {/* Column -> Email */}
          <div className="space-y-2">
            <label className="block text-md text-slate-700">Email</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="block p-2 border rounded-sm focus:ring focus:ring-orange-500 w-full" />
          </div>

          {/* Column -> Password */}
          <div className="space-y-2">
            <label className="block text-md text-slate-700">Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="block p-2 border rounded-sm focus:ring focus:ring-orange-500 w-full" />
          </div>

          {/* Button -> Submit */}
          <button type="submit" onClick={() => navigate("/admin/dashboard")} className="bg-orange-500 duration-300 flex gap-2 items-center justify-center py-1.5 rounded-md text-white transition w-full hover:bg-orange-700 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
              />
              <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
            </svg>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
