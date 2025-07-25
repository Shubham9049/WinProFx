"use client";
import BenefitsSection from "../../components/BenefitsSection";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import mobile from "../../assets/new-mobile.png";

import Stats from "../../components/Stats";
import TradeSection from "../../components/Markets";
import Image from "next/image";
import Button from "../../components/Button";
import logo from "../../assets/logo.webp";
import NewsInsights from "../../components/NewsInsights";
import PaymentMethods from "../../components/PaymentMethods";
import InsightsSection from "../../components/Inside_Contact";

export default function Home() {
  const handleClick = () => alert("Account Opening Started!");
  return (
    <div className="bg-[#121E2C]">
      <Navbar />
      <Hero />
      <Stats />

      <BenefitsSection />

      <TradeSection />
      <section className="py-10">
        <div className="relative w-11/12 md:w-4/5 mx-auto">
          {/* Box with gradient and text */}
          <div className="bg-gradient-to-b from-[#121E2C] to-[#104E64] text-white p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
            {/* Text Content */}
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Trade to <span className="text-cyan-400">WIN</span>
              </h2>
              <p className="text-lg font-medium mb-1">
                Trade more and win <span className="font-bold">GUARANTEED</span>{" "}
                prizes.
              </p>
              <p className="mb-3">The more you trade, the better the prize.</p>
              <p className="italic text-sm text-gray-300 mb-4">
                Promotion Dates: 1st January 2025 to 31st May 2025
              </p>
              <Button text="Learn More" onClick={handleClick} />
            </div>
          </div>

          {/* Image going below the box */}
          <div className="absolute -bottom-10 right-0 md:right-[-40px] z-10 hidden md:block">
            <Image
              src={mobile}
              alt="Promo Prizes"
              className="w-60 md:w-80 object-contain"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="w-11/12 md:w-4/5 mx-auto grid md:grid-cols-3 rounded-2xl overflow-hidden">
          {/* Left 2/3 Content Section */}
          <div className="md:col-span-2 bg-[#34404A] text-white p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              ABOUT <span className="text-cyan-400">WINPROFX</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Limitless opportunity for excessive growth
            </p>
            <p className="mb-5 text-gray-300">
              At WinproFX, we offer a secure online trading platform, fostering
              sustainability through expertise, market knowledge, and trusted
              partnerships.
            </p>

            <ul className="list-none space-y-2 text-xs text-gray-300">
              <li>
                <span className="text-cyan-400 text-2xl">•</span> Best platform
                for Every Class of Traders: Beginners, Intermediate or
                Professional.
              </li>
              <li>
                <span className="text-cyan-400 text-2xl">•</span> Sophisticated
                order management tools.
              </li>
              <li>
                <span className="text-cyan-400 text-2xl">•</span> Introducing
                more native technical indicators.
              </li>
              <li>
                <span className="text-cyan-400 text-2xl">•</span> Easy to
                configure and customize your trading setup.
              </li>
            </ul>
            <button className="mt-6 relative overflow-hidden px-4 py-1 border border-cyan-400 text-cyan-400 rounded-full group">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white text-xs">
                Explore More →
              </span>
              <span className="absolute inset-0 bg-[var(--primary)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></span>
            </button>
          </div>

          {/* Right 1/3 Image Section with different bg */}
          <div className="bg-[#19232D] flex items-center justify-center p-6">
            <Image
              src={logo}
              alt="WinproFX Logo"
              className="w-40 md:w-52 object-contain"
            />
          </div>
        </div>
      </section>

      <NewsInsights />
      <PaymentMethods />
      <section className="w-11/12 md:w-4/5 mx-auto py-12 space-y-5">
        <h2 className="text-center max-w-3xl mx-auto text-gray-200 text-xl md:text-2xl font-bold">
          Embark on a transformative trading journey with us — where{" "}
          <span className="text-[var(--primary)]">
            trading isn't just an action, it's a difference.
          </span>{" "}
          Trade with us, be the difference.
        </h2>
        <p className="text-gray-400 text-center max-w-4xl mx-auto">
          Dive into a world where every trade creates a ripple of impact. Join
          us in shaping a unique trading experience that not only sets you apart
          but also makes a positive difference. Trade with purpose, trade with
          us.
        </p>
        <div className="flex justify-center">
          <Button text="Open Account" onClick={handleClick} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
