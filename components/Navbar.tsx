"use client";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { div } from "framer-motion/client";
import logo from "../assets/logo.webp";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    {
      title: "Markets",
      dropdown: true,
      items: [
        { label: "Forex", href: "/forex" },
        { label: "Indices", href: "/indices" },
        { label: "Crypto", href: "/crypto" },
        { label: "Metals", href: "/metals" },
        { label: "Commodities", href: "/commodities" },
        { label: "Oil", href: "/oil" },
      ],
    },
    {
      title: "Trading",
      dropdown: true,
      items: [
        { label: "Platforms", href: "/platform" },
        { label: "Accounts", href: "/accounts" },
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
        { label: "News", href: "/news" },
        { label: "Blogs", href: "/blog" },
      ],
    },
    {
      title: "Tools",
      dropdown: true,
      items: [
        { label: "Analytical Tools", href: "/analytical-tools" },
        { label: "Economic Calendar", href: "/economic-calendar" },
        { label: "Currency Calculator", href: "/currency-calculator" },
        { label: "Currency Converter", href: "/currency-converter" },
      ],
    },
    {
      title: "Promotions",
      dropdown: true,
      items: [
        { label: "2.5% Cashback", href: "/cashback" },
        { label: "Trade to Win", href: "/trade-to-win" },
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
      } text-gray-400 font-montserrat`}
    >
      <div className="w-11/12 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <Image src={logo} alt="logo" className="w-36 h-24" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.title}
                className="relative group cursor-pointer py-8"
              >
                <span className="flex items-center gap-1 hover:text-white transition ">
                  {item.title}
                  <ChevronDown className="w-4 h-4" />
                </span>
                <div className="absolute space-y-3 top-full -left-10 hidden group-hover:block bg-[#0d1721] text-gray-500 shadow-lg py-2 px-4 rounded w-48 z-50">
                  {item.items?.map((link) => (
                    <div
                      key={link.href} // ✅ Key goes here
                      className="flex justify-between hover:text-[var(--primary)] hover:font-bold"
                    >
                      <Link
                        href={link.href}
                        className="block px-2 py-1 hover:text-white text-sm"
                      >
                        {link.label}
                      </Link>
                      <p className="font-bold">→</p>
                    </div>
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
            className="hover:bg-[var(--primary)] hover:text-white px-4 py-2 rounded-full hover:border hover:border-[var(--primary)] transition text-[var(--primary)]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="group relative inline-block px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-full overflow-hidden"
          >
            <span className="absolute inset-0 bg-[var(--primary)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></span>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Register
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            className="text-[var(--primary)] border border-[var(--primary)] px-4 py-1 rounded-full text-sm hover:bg-[var(--primary)] hover:text-black transition"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
          <button
            className="text-[var(--primary)] border border-[var(--primary)] px-4 py-1 rounded-full text-sm hover:bg-[var(--primary)] hover:text-black transition"
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
            className="hover:text-white text-[var(--primary)] block"
          >
            Introducing Broker
          </Link>
          {/* <Link href="/login" className="hover:text-white block">
            Login
          </Link>
          <Link
            href="/register"
            className="text-[var(--primary)] border border-[var(--primary)] w-fit px-4 py-1 rounded-full block mt-2"
          >
            Register
          </Link> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
