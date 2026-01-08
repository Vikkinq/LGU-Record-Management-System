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
              src="https://scontent.fcgy2-1.fna.fbcdn.net/v/t1.15752-9/514052846_1277406307075945_3903648811279742043_n.png?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFEvsqz829AN22rL7ol6Br32rrkB-xM3IrauuQH7Ezcil2KyuKp6LAeGn6qsdEwcqpYEdjeKvD8VsxwyAhM9L44&_nc_ohc=VAHKWgna_r8Q7kNvwG5SckN&_nc_oc=Adkw7J0DIuIUVWfF6yowa1bdZdGEJ-pedWERvS7GKEat2EGP-IeEYxl3uUrY0AA1438&_nc_zt=23&_nc_ht=scontent.fcgy2-1.fna&oh=03_Q7cD4QFOMvZF6PI4ZSsUghMj8gUR2yONkMSEGqjWUT-I5Hgr2A&oe=6985C260"
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
