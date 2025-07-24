"use client";
import heroImage from "../assets/hero.webp";
import Button from "./Button";
import { UserPlus, DollarSign, LineChart } from "lucide-react";
import Typewriter from "typewriter-effect";
import icon1 from "../assets/icons/icon.svg";
import icon2 from "../assets/icons/icon2.svg";
import icon3 from "../assets/icons/icon3.svg";

export default function Hero() {
  const handleClick = () => alert("Account Opening Started!");

  return (
    <div className="relative font-montserrat bg-[#121E2C] py-20 md:pt-0">
      {/* HERO SECTION */}
      <section className="relative md:h-[80vh] w-full text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-[#121E2A]"
          style={{
            backgroundImage: `url(${heroImage.src})`,
          }}
        ></div>

        {/* Centered Content */}
        <div className="relative  mx-auto z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-2xl md:text-3xl max-w-2xl font-bold my-6 leading-tight whitespace-pre-wrap">
            <Typewriter
              options={{
                strings: [
                  "Your Path To Profitable \n Trading Starts Here",
                  "Trade Smart:\n Elevate Your Financial Potential",
                  "Empower Your Portfolio:\n Unleash the Future of Trading",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </h1>
          <p className="text-md md:max-w-4xl mb-6 text-gray-400">
            WinproFX is a Globally Reputed Broker Offering Tightest Spreads,
            Lightning Fast Withdrawals, 300+ Tradable Instruments With
            Nanosecond Execution on Your Finger tips.
          </p>
          <Button text="Open Account" onClick={handleClick} />
        </div>
      </section>

      {/* OVERLAPPING BOX */}
      <div className="relative mt-6 md:-mt-36 px-4 z-10">
        <div
          className="mx-auto w-full md:w-4/5 rounded-3xl p-6 md:p-12 text-white"
          style={{
            background:
              "linear-gradient(to bottom, #0B121A 0%, #0F2231 50%, #10364C 100%)",
          }}
        >
          {/* Heading + Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left">
            <h2 className="text-2xl  font-semibold leading-tight">
              How Can You Start Making <br />
              <span className="text-cyan-400">Money</span> With Us
            </h2>
            <div className="mt-4 md:mt-0">
              <Button text="Open Account" onClick={handleClick} />
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-14 text-center md:text-left">
            {/* Card 1 */}
            <div
              className="flex flex-col items-center md:items-start text-white"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src={icon1.src}
                alt="Open Account"
                className="w-12 h-12 mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Open an account</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Click the button above and just follow some easy steps to get
                started.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="flex flex-col items-center md:items-start text-white"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <img
                src={icon2.src}
                alt="Make Deposit"
                className="w-12 h-12 mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Make a deposit</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Pro Tip: USDT Deposits and Withdrawals are the Fastest and most
                reliable.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="flex flex-col items-center md:items-start text-white"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <img
                src={icon3.src}
                alt="Start Trading"
                className="w-12 h-12 mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Start Trading</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Every professional started from scratch. So start trading now
                with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
