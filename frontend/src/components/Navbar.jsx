import { Link } from "react-router-dom";
import { FaShieldHalved } from "react-icons/fa6";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="w-full px-8 py-5 flex justify-between items-center bg-slate-900/70 backdrop-blur-md border-b border-slate-700">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <FaShieldHalved className="text-cyan-400 text-3xl" />

        <h1 className="text-2xl font-bold text-white">
          TruthLens <span className="text-cyan-400">AI</span>
        </h1>
      </Link>

      {/* Navigation */}
      <ul className="hidden md:flex gap-8 items-center text-gray-300">

        <li>
          <Link
            to="/"
            className="hover:text-cyan-400 transition"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/history"
            className="hover:text-cyan-400 transition"
          >
            History
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className="hover:text-cyan-400 transition"
          >
            About
          </Link>
        </li>

        {user ? (
          <>
            <li className="text-cyan-400 font-semibold">
              Welcome, {user.name}
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-cyan-400 text-black hover:bg-cyan-500 transition"
              >
                Register
              </Link>
            </li>
          </>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;