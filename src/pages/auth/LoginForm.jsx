import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn as LogInIcon } from "lucide-react";
import wallpaper from "../../assets/bg.jpg";
import useLogin from "./useLogin";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { email, password, isLoading, setEmail, setPassword, handleSubmit } =
    useLogin();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div
      className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card w-full bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="text-center p-5">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogInIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-sm">Sign in to continue</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 pl-10 pr-3 bg-white/5 placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/5 focus:shadow-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 pl-10 pr-12 bg-white/5 placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/5 focus:shadow-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="card-actions">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 mx-auto"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 100 16v-4l-4 4 4 4v-4a8 8 0 01-8-8z"
                      />
                    </svg>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
