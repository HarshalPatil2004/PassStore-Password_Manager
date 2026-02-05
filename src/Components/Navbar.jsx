import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';


const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="relative">
      {/* Background */}
      <div className="bg-green-600/25 backdrop-blur-xl p-4 sm:p-6 shadow-2xl border border-green-500/30">

        {/* Navbar Content */}
        <div className="flex items-center justify-between px-4 sm:px-8 gap-4">

          {/* Logo */}
          <div className="text-sm sm:text-xl font-bold tracking-wide flex-shrink-0">
            <span className="text-green-600">&lt;Pass</span>
            <span className="hidden sm:inline">Store</span>
            <span className="text-green-600">/&gt;</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
            title="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-white block transition-all"></span>
            <span className="w-6 h-0.5 bg-white block transition-all"></span>
            <span className="w-6 h-0.5 bg-white block transition-all"></span>
          </button>

          {/* Navigation Tabs - Desktop */}
          <ul className="hidden sm:flex gap-4 lg:gap-8 text-xs sm:text-sm lg:text-base font-medium">

            <Link
              to="/"
              className="cursor-pointer bg-white/10 hover:bg-green-500/20 hover:text-green-600 font-semibold px-3 py-1.5 rounded-lg transition-all"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="cursor-pointer bg-white/10 hover:bg-green-500/20 hover:text-green-600 font-semibold px-3 py-1.5 rounded-lg transition-all"
            >
              About
            </Link>

            <Link
              to="/passwords"
              className="cursor-pointer bg-white/10 hover:bg-green-500/20 hover:text-green-600 font-semibold px-3 py-1.5 rounded-lg transition-all"
            >
              Password
            </Link>

            <Link
              to="/help"
              className="cursor-pointer bg-white/10 hover:bg-green-500/20 hover:text-green-600 font-semibold px-3 py-1.5 rounded-lg transition-all"
            >
              Help
            </Link>

          </ul>

          <div className="bg-green-800 p-1.5 sm:p-2 text-white rounded-md gap-2 font-bold ring-amber-300 ring-2 flex-shrink-0 text-xs sm:text-sm flex items-center">
            <span className="hidden sm:inline mx-1"><GitHubIcon style={{ fontSize: '20px' }} /></span>
            <span className="hidden sm:inline">GitHub</span>
            <span className="sm:hidden"><GitHubIcon style={{ fontSize: '18px' }} /></span>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="sm:hidden mt-4 pb-2 border-t border-green-500/30 pt-4">
            <ul className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer bg-white/10 hover:bg-green-500/20 hover:text-green-600 font-semibold text-sm px-3 py-2 rounded-lg transition-all block text-center"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer bg-white/10 hover:bg-green-500/20 hover:text-green-600 font-semibold text-sm px-3 py-2 rounded-lg transition-all block text-center"
              >
                About
              </Link>

              <Link
                to="/passwords"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer bg-white/10 hover:bg-green-500/20 hover:text-green-600 font-semibold text-sm px-3 py-2 rounded-lg transition-all block text-center"
              >
                Password
              </Link>

              <Link
                to="/help"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer bg-white/10 hover:bg-green-500/20 hover:text-green-600 font-semibold text-sm px-3 py-2 rounded-lg transition-all block text-center"
              >
                Help
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
