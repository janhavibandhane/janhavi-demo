import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginService } from "../services/service";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const { login, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();


  const [form, setForm] = useState({
    username: "mor_2314",
    password: "83r5^_",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginService(form);
      login({ username: form.username }, data.token);
          navigate("/", { replace: true });
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#7aa2f7] via-[#8ec5fc] to-[#cdb4db] flex items-center justify-center px-4">

      {/* Mountains layers */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#1e3a8a] to-transparent opacity-80" />
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-[#1e40af] to-transparent opacity-70" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-10 text-white">

        {/* Power Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-2xl">⏻</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-6">
          Welcome back!
        </h2>

        {error && (
          <p className="text-red-200 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Email address"
            value={form.username}
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

          <div className="flex justify-between text-sm text-white/70 px-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <span className="cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-white text-[#3b82f6] 
            font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/70 mb-3">
            Not a member yet?
          </p>
          <Link to="/register">
          <button className="px-8 py-2 rounded-full bg-white/20 hover:bg-white/30 transition">
            Sign up
          </button>
          </Link>
        </div>

        {/* Social */}
        <div className="mt-8 flex justify-center gap-6 text-white/60 text-sm">
          <span className="cursor-pointer">Facebook</span>
          <span className="cursor-pointer">Twitter</span>
          <span className="cursor-pointer">Instagram</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
