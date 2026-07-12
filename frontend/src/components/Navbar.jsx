import { FaShieldHalved } from "react-icons/fa6";

function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex justify-between items-center bg-slate-900/70 backdrop-blur-md border-b border-slate-700">
      <div className="flex items-center gap-3">
        <FaShieldHalved className="text-cyan-400 text-3xl" />
        <h1 className="text-2xl font-bold text-white">
          TruthLens <span className="text-cyan-400">AI</span>
        </h1>
      </div>

      <ul className="hidden md:flex gap-8 text-gray-300">
        <li className="hover:text-cyan-400 cursor-pointer">Home</li>
        <li className="hover:text-cyan-400 cursor-pointer">Analyze</li>
        <li className="hover:text-cyan-400 cursor-pointer">About</li>
      </ul>
    </nav>
  );
}

export default Navbar;