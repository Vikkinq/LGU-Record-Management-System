import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../services/auth.services";
import { createUserProfile } from "../../services/user.services";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-700 via-slate-600 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="hidden md:flex justify-center items-center">
          <div className="w-48 h-48 rounded-full bg-linear-to-br from-slate-400 to-slate-300 shadow-2xl flex items-center justify-center">
            <svg className="w-24 h-24 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M 12 14 C 7 14 3 16.5 3 20 L 21 20 C 21 16.5 17 14 12 14 Z" />
            </svg>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">WELCOME</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password:</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-emerald-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <span className="text-gray-400 cursor-not-allowed">I've forgotten my password</span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">© 2025 All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
