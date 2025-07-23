"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { title: "Markets", dropdown: true },
    { title: "Trading", dropdown: true },
    { title: "About Us", dropdown: false },
    { title: "Education", dropdown: false },
    { title: "Insights", dropdown: true },
    { title: "Tools", dropdown: true },
    { title: "Promotions", dropdown: true },
  ];

  return (
    <nav className="bg-[#0b111d] text-gray-400 py-4 shadow-md font-montserrat">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <img
            src="https://winprofx.com/_next/static/media/logo.30704b62.svg"
            alt="Logo"
            className="h-12"
          />
        </div>

        {/* Center: Nav Items */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map(({ title, dropdown }) => (
            <div key={title} className="relative group cursor-pointer">
              <span className="flex items-center gap-1 hover:text-white transition">
                {title}
                {dropdown && <ChevronDown className="w-4 h-4" />}
              </span>
              {dropdown && (
                <div className="absolute top-full left-0 hidden group-hover:block bg-white text-black shadow-lg mt-2 py-2 px-4 rounded">
                  <p className="text-sm">Dropdown content</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Buttons */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/introducing-broker"
            className="hover:text-[#00D5FF] transition text-[#0e83f9]"
          >
            Introducing Broker
          </Link>
          <Link
            href="/login"
            className="hover:bg-[#00D5FF] hover:text-white px-4 py-2 rounded-full hover:border transition text-[#00D5FF]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className=" px-4 py-2 border border-cyan-400 text-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0b111d] text-sm font-medium px-6 pt-4 pb-6 space-y-3">
          {navItems.map(({ title }) => (
            <p key={title} className="hover:text-white transition">
              {title}
            </p>
          ))}
          <p className="hover:text-white transition">Introducing Broker</p>
          <p className="hover:text-white transition">Login</p>
          <p className="text-cyan-400 border border-cyan-400 w-fit px-4 py-1 rounded-full">
            Register
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
