"use client";
import heroImage from "../assets/hero.webp";
import Button from "./Button";
import { UserPlus, DollarSign, LineChart } from "lucide-react";

export default function Hero() {
  const handleClick = () => alert("Account Opening Started!");

  return (
    <div className="relative font-montserrat">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] w-full text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
          style={{
            backgroundImage: `url(${heroImage.src})`,
          }}
        />

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Trade Smart. Trade Secure.
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your Gateway to Global Markets.
          </p>
          <Button text="Open Account" onClick={handleClick} />
        </div>
      </section>

      {/* OVERLAPPING BOX */}
      <div className="relative z-20 -mt-20 md:-mt-28 px-4">
        <div className="mx-auto w-full md:w-4/5 bg-gradient-to-b from-[#112135] to-[#0b1c29] rounded-2xl p-6 md:p-10 shadow-xl text-white">
          {/* Title + Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">
              How Can You Start Making{" "}
              <span className="text-cyan-400">Money</span> With Us
            </h2>
            <div className="mt-4 md:mt-0">
              <Button text="Open Account" onClick={handleClick} />
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <UserPlus className="w-10 h-10 mx-auto md:mx-0 text-cyan-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Open an account</h3>
              <p className="text-sm text-gray-300">
                Click the button above and just follow some easy steps.
              </p>
            </div>
            <div>
              <DollarSign className="w-10 h-10 mx-auto md:mx-0 text-cyan-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Make a deposit</h3>
              <p className="text-sm text-gray-300">
                Pro Tip: USDT Deposits and Withdrawals are the Fastest.
              </p>
            </div>
            <div>
              <LineChart className="w-10 h-10 mx-auto md:mx-0 text-cyan-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Start Trading</h3>
              <p className="text-sm text-gray-300">
                Every professional started from scratch. So start trading now.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
