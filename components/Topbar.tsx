"use client";

import {
  Bell,
  Globe,
  HelpCircle,
  ChevronDown,
  Maximize,
  Minimize,
} from "lucide-react";
import Image from "next/image";
import userAvatar from "../assets/logo.webp"; // replace with your image
import { useEffect, useState } from "react";

export default function Topbar() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Track full screen state
  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .catch((err) =>
          console.error("Error trying to enable full-screen mode:", err)
        );
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <header className="h-16 w-full bg-[#121e2c] text-white flex items-center justify-between px-6 shadow z-40 relative">
      {/* Left Side */}
      <div className="text-lg font-semibold">Welcome Back!</div>

      {/* Right Side */}
      <div className="flex items-center gap-4 relative">
        {/* Fullscreen toggle */}
        <button
          className="hover:text-gray-300 transition"
          title="Toggle Fullscreen"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>

        {/* Icons */}
        <button
          className="hover:text-gray-300 transition"
          title="Notifications"
        >
          <Bell size={20} />
        </button>
        <button className="hover:text-gray-300 transition" title="Language">
          <Globe size={20} />
        </button>
        <button className="hover:text-gray-300 transition" title="Help">
          <HelpCircle size={20} />
        </button>

        {/* Avatar Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 hover:text-gray-300"
            onClick={() => setOpenUserMenu((prev) => !prev)}
          >
            <Image
              src={userAvatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-500"
            />
            <ChevronDown size={16} />
          </button>

          {/* Dropdown menu */}
          {openUserMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow z-50">
              <a
                href="/settings/accounts"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/settings/security"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Security
              </a>
              <a
                href="/signout"
                className="block px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
