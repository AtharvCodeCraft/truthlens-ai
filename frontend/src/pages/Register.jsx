import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      toast.success(response.data.message || "Registration successful!");

    } catch (error) {
      
      toast.error(error.response?.data?.detail || "Registration failed");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <form
        onSubmit={handleRegister}
        className="bg-slate-900 p-8 rounded-2xl w-96 border border-slate-700"
      >

        <h1 className="text-3xl font-bold text-white mb-8">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;