import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    // Save JWT Token
    localStorage.setItem(
      "token",
      response.data.access_token
    );

    // Save User Details
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    toast.success("Login successful!");

     setTimeout(() => {
      window.location.href = "/";
    }, 1000);

    // Redirect to Home
    window.location.href = "/";

  } catch (error) {
    alert(error.response?.data?.detail || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

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
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-black py-3 rounded-lg font-bold"
        >
          Login
        </button>
        

      </form>

    </div>
  );
}

export default Login;