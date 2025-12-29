

import React from "react";
import { Mail, User2Icon, Lock } from "lucide-react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);

      localStorage.setItem("token", data.token);
      dispatch(login({ token: data.token, user: data.user }));

      toast.success(data.message || "Success");
      navigate("/app");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-200 px-8"
      >
        {/* Logo / Title */}
        <h1 className="text-3xl font-semibold text-slate-900 mt-10">
          {state === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          {state === "login"
            ? "Login to continue to Resume"
            : "Sign up to get started with Resume"}
        </p>

        {/* Name */}
        {state !== "login" && (
          <div className="mt-6 flex items-center gap-3 h-11 rounded-lg border border-slate-300 px-4 focus-within:border-blue-500 transition">
            <User2Icon size={16} className="text-slate-400" />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none text-sm"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="mt-4 flex items-center gap-3 h-11 rounded-lg border border-slate-300 px-4 focus-within:border-blue-500 transition">
          <Mail size={16} className="text-slate-400" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mt-4 flex items-center gap-3 h-11 rounded-lg border border-slate-300 px-4 focus-within:border-blue-500 transition">
          <Lock size={16} className="text-slate-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none text-sm"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        {/* Switch */}
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-sm text-slate-500 mt-4 mb-10 cursor-pointer text-center"
        >
          {state === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}
          <span className="text-blue-600 font-medium ml-1 hover:underline">
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
