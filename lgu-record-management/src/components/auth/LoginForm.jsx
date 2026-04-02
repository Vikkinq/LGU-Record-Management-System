import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../services/auth.services";
import { createUserProfile } from "../../services/user.services";
import LoadingSpinner from "../general/LoadingSpinner";

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
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl bg-slate-200">
            <img
              src="https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/577784236_25136480575963085_1706918526497340446_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHjR1qg50c_bFffQlcVZ90le7w9G6MNLlF7vD0bow0uUTdXLeBpAh1Dw60C7Q5dbKQnviDk8D-l316SZOXKoS4t&_nc_ohc=9dorHjU0dzEQ7kNvwGClj6F&_nc_oc=Adr-spdR9M-GtIuc1NgxLJJ-LbIbA3USJhK6MBTSNq9O6w4Q2O6IWgK084GsMX4cYfc&_nc_zt=23&_nc_ht=scontent.fcgy2-1.fna&_nc_gid=IzefFVbaeX4m0nvnb7qukA&_nc_ss=7a3a8&oh=00_Af0FxG_ba8mt3-58wx_qX7nxBur9D1nrrGIGeYz56uMTvQ&oe=69D3D1D5"
              alt="User Avatar"
              className="w-full h-full object-cover"
              loading="lazy"
            />
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

      {loading && <LoadingSpinner label="Logging In..." />}
    </div>
  );
}
