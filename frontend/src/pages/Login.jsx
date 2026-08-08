import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const { user, access_token } = response.data;

      if (!access_token || !user) {
        throw new Error("Invalid login response from server.");
      }

      login(user, access_token);

      toast.success("Login successful!");

      navigate("/", { replace: true });

    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error.response?.data?.detail ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-2xl w-96 border border-slate-700"
      >
        <h1 className="text-3xl font-bold text-white mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black py-3 rounded-lg font-bold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;