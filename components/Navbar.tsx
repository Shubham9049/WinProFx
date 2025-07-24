"use client";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    {
      title: "Markets",
      dropdown: true,
      items: [
        { label: "Overview", href: "/markets/overview" },
        { label: "Live Prices", href: "/markets/live" },
        { label: "Asset List", href: "/markets/assets" },
      ],
    },
    {
      title: "Trading",
      dropdown: true,
      items: [
        { label: "Platforms", href: "/trading/platforms" },
        { label: "Account Types", href: "/trading/accounts" },
        { label: "Spreads & Fees", href: "/trading/spreads" },
      ],
    },
    {
      title: "About Us",
      dropdown: false,
      href: "/about",
    },
    {
      title: "Education",
      dropdown: false,
      href: "/education",
    },
    {
      title: "Insights",
      dropdown: true,
      items: [
        { label: "Market News", href: "/insights/news" },
        { label: "Analysis", href: "/insights/analysis" },
      ],
    },
    {
      title: "Tools",
      dropdown: true,
      items: [
        { label: "Economic Calendar", href: "/tools/calendar" },
        { label: "Trading Calculators", href: "/tools/calculators" },
      ],
    },
    {
      title: "Promotions",
      dropdown: true,
      items: [
        { label: "Current Offers", href: "/promotions/current" },
        { label: "Referral Program", href: "/promotions/referral" },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 mb-10 md:mb-0 transition-all duration-300 ${
        isScrolled
          ? "bg-[#121E2C]/80 backdrop-blur shadow-lg"
          : "bg-transparent"
      } text-gray-400 py-4 font-montserrat`}
    >
      <div className="w-11/12 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img
            src="https://winprofx.com/_next/static/media/logo.30704b62.svg"
            alt="Logo"
            className="h-12"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.title} className="relative group cursor-pointer">
                <span className="flex items-center gap-1 hover:text-white transition">
                  {item.title}
                  <ChevronDown className="w-4 h-4" />
                </span>
                <div className="absolute top-full left-0 hidden group-hover:block bg-white text-black shadow-lg  py-2 px-4 rounded w-48 z-50">
                  {item.items?.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-2 py-1 hover:bg-gray-100 rounded text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.title}
                href={item.href!}
                className="hover:text-white transition"
              >
                {item.title}
              </Link>
            )
          )}
        </div>

        {/* Desktop Buttons */}
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
            className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            className="text-[#00D5FF] border border-[#00D5FF] px-4 py-1 rounded-full text-sm hover:bg-[#00D5FF] hover:text-black transition"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
          <button
            className="text-cyan-400 border border-cyan-400 px-4 py-1 rounded-full text-sm hover:bg-cyan-400 hover:text-black transition"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-2"
          >
            <svg
              className="w-6 h-6 text-white"
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
        <div className="md:hidden h-[100vh] bg-[#0b111d] text-sm font-medium px-6 pt-6 pb-6 mt-[20px] space-y-5">
          {navItems.map((item) => (
            <div key={item.title}>
              <div
                className="flex items-center justify-between text-white cursor-pointer"
                onClick={() =>
                  item.dropdown
                    ? setOpenDropdown(
                        openDropdown === item.title ? null : item.title
                      )
                    : null
                }
              >
                {item.dropdown ? (
                  <>
                    <span>{item.title}</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                ) : (
                  <Link href={item.href!} className="hover:text-white">
                    {item.title}
                  </Link>
                )}
              </div>

              {/* Mobile dropdown */}
              {item.dropdown && openDropdown === item.title && (
                <div className="ml-4 mt-2 pl-2 border-l border-gray-700 text-gray-300 space-y-1">
                  {item.items?.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-1 text-sm hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/introducing-broker"
            className="hover:text-white text-cyan-400 block"
          >
            Introducing Broker
          </Link>
          {/* <Link href="/login" className="hover:text-white block">
            Login
          </Link>
          <Link
            href="/register"
            className="text-cyan-400 border border-cyan-400 w-fit px-4 py-1 rounded-full block mt-2"
          >
            Register
          </Link> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
