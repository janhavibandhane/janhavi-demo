import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { registerService } from "../services/service";
import { Link } from "react-router-dom";

const Register = () => {
  const { setLoading, loading } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerService(form);
      setSuccess("Account created successfully! Please login.");
      setForm({ username: "", email: "", password: "" });
    } catch {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#7aa2f7] via-[#8ec5fc] to-[#cdb4db] flex items-center justify-center px-4">

      {/* Mountain layers */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#1e3a8a] to-transparent opacity-80" />
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-[#1e40af] to-transparent opacity-70" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-10 text-white">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-2xl">➕</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-6">
          Create account
        </h2>

        {error && (
          <p className="text-red-200 text-sm text-center mb-4">{error}</p>
        )}

        {success && (
          <p className="text-green-200 text-sm text-center mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-full bg-white/20 
            placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-full bg-white/20 
            placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-full bg-white/20 
            placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-white text-[#3b82f6] 
            font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {/* Switch to login */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/70 mb-3">
            Already have an account?
          </p>
          <Link to="/login">
          <button className="px-8 py-2 rounded-full bg-white/20 hover:bg-white/30 transition">
            Login
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
