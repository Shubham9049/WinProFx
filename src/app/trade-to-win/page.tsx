"use client";

import Button from "../../../components/Button";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import image from "../../../assets/new-mobile.png";
import Image from "next/image";

export default function TradeToWin() {
  const handleClick = () => alert("Account Opening Started!");

  return (
    <div className="bg-[#121E2C] text-white">
      <Navbar />

      <section className="w-11/12 md:w-4/5 mx-auto pt-36 pb-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            Unlock Amazing <span className="text-cyan-400">Rewards</span> <br />
            with Every Trade!
          </h2>
          <p className="italic text-gray-300 mb-6">
            Achieve specific trading volumes in 30 days and claim incredible
            prizes!
          </p>

          {/* Primary CTA */}
          <Button text="Join Now" onClick={handleClick} />

          {/* Secondary CTA */}
          <button
            className="mt-6 ml-5 relative overflow-hidden px-6 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-full group text-sm font-medium"
            onClick={handleClick}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              View Brochure →
            </span>
            <span className="absolute inset-0 bg-[var(--primary)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></span>
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Image
            src={image}
            alt="Rewards Image"
            className="w-[280px] md:w-[350px] object-contain"
            priority
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
