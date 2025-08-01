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
import userAvatar from "../assets/logo.webp";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userName, setUserName] = useState("");

  const router = useRouter();

  // Fullscreen toggle tracking
  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser.fullName || "User");
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    }
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

  // 🔐 Sign out logic
  const handleSignOut = () => {
    // Clear token or any auth data
    localStorage.removeItem("token"); // or sessionStorage / cookies
    localStorage.removeItem("user"); // or sessionStorage / cookies

    // Redirect to home page
    router.push("/");
  };

  return (
    <header className="h-16 w-full bg-[#121e2c] text-white flex items-center justify-between px-6 shadow z-40 relative">
      <div className="text-lg font-semibold">Welcome Back!</div>

      <div className="flex items-center gap-4 relative">
        <button
          className="hover:text-gray-300 transition"
          title="Toggle Fullscreen"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>

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

        <div className="relative">
          <button
            className="flex items-center gap-2 hover:text-gray-300"
            onClick={() => setOpenUserMenu((prev) => !prev)}
          >
            <span className="hidden md:inline text-sm font-medium">
              {userName}
            </span>
            <ChevronDown size={16} />
          </button>

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
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
