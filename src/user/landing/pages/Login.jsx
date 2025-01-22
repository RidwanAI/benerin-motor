import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";

/* ========== User ========== */
// Layout
import Layout from "./Layout";

// Components
import AutoScroll from "../components/generals/AutoScroll";
import adminService from "../../../services/adminService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;
      if (formData.email.includes("4dm1n")) {
        // Login sebagai admin
        response = await adminService.adminLogin(formData);
        navigate("/admin/dashboard");
      } else {
        // Login sebagai user
        response = await authService.login(formData);
        navigate("/shop");
      }

      console.log("Login successful:", response);
    } catch (err) {
      setError(err.msg || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <AutoScroll />
      <section id="login" className="font-poppins">
        <div className="bg-home">
          <div className="flex flex-col gap-4 items-center justify-center max-w-7xl min-h-screen mx-auto px-3 py-24 w-full md:px-7">
            <div className="border bg-black bg-opacity-50 p-5 py-10 rounded-md space-y-4 text-white w-full md:w-1/2">
              <p className="font-semibold text-xl xl:text-2xl text-center">
                Login ~ Benerin <span className="text-orange-500">Motor</span>
              </p>

              <hr className="border-2 w-full" />

              {/* Error Message */}
              {error && (
                <div className="bg-red-500 text-white p-3 rounded-sm text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-300 rounded-sm text-black focus:outline-none focus:ring focus:ring-orange-500"
                    placeholder="Enter your email..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-300 rounded-sm text-black focus:outline-none focus:ring focus:ring-orange-500"
                    placeholder="Enter your password..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700 transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-orange-500 hover:underline"
                  >
                    Register
                  </Link>
                </p>
                <p>or</p>
                <button
                  type="button"
                  className="duration-300 flex gap-2 items-center justify-center py-2 rounded-md text-sm w-full border border-orange-500 hover:bg-orange-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-google"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                  </svg>
                  <p>Continue with Google Account</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
