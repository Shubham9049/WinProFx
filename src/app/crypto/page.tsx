"use client";

import { div } from "framer-motion/client";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import InsightsSection from "../../../components/Inside_Contact";

export default function Crypto() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleClick = () => alert("Account Opening Started!");

  const chartItems = [
    {
      id: 1,
      icon: "https://winprofx.com/_next/static/media/trade(5).03e7c8a4.svg",
      title: "BTCUSD",
      subtitle: "Bitcoin",
      price: "1.0932",
      currency: "USD",
      change: "-0.00072 -0.07%",
      changeColor: "text-red-400",
      chart: "https://winprofx.com/_next/static/media/grap.37f414da.svg",
    },
    {
      id: 2,
      icon: "https://winprofx.com/_next/static/media/trade(6).2e96817c.svg",
      title: "ETHUSD",
      subtitle: "Ethereum",
      price: "1.0932",
      currency: "USD",
      change: "+0.00072 +0.07%",
      changeColor: "text-green-400",
      chart: "https://winprofx.com/_next/static/media/grap.37f414da.svg",
    },
    {
      id: 3,
      icon: "https://winprofx.com/_next/static/media/trade(8).d78a1f00.svg",
      title: "DOGEUSD",
      subtitle: "Dogecoin",
      price: "1.0932",
      currency: "USD",
      change: "+0.00072 +0.07%",
      changeColor: "text-green-400",
      chart: "https://winprofx.com/_next/static/media/grap.37f414da.svg",
    },
    {
      id: 4,
      icon: "https://winprofx.com/_next/static/media/trade(7).134a1ffd.svg",
      title: "MaticUSD",
      subtitle: "Polygon",
      price: "1.0932",
      currency: "USD",
      change: "-0.00072 -0.07%",
      changeColor: "text-red-400",
      chart: "https://winprofx.com/_next/static/media/grap.37f414da.svg",
    },
  ];

  const accordionItems = [
    {
      title: "DISCOVER HOW TO TRADE",
      content:
        "Learn how to trade forex with beginner-friendly guides and tutorials.",
    },
    {
      title: "WHAT IS FOREX?",
      content:
        "Forex is a global market for currency exchange. It operates 24/5 and is the most liquid financial market.",
    },
    {
      title: "HOW TO TRADE FOREX?",
      content:
        "To trade forex, choose a broker, open an account, and start analyzing the markets.",
    },
  ];

  return (
    <div>
      <Navbar />
      <main className="bg-[#0b1e26] text-white font-[Montserrat] pt-12 pb-8">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mt-4">
            <span className="text-cyan-400"> CRYPTOCURRENCY</span> TRADING?
          </h1>
          <p className="mt-4 text-gray-400 w-11/12 mx-auto">
            Cryptocurrencies also known as digital currencies are fast-growing
            investment instruments attracting popularity worldwide. Traders can
            trade a wide range of crypto-currencies as the ideal asset in CFD
            trades. Available on MT5 you can now trade Bitcoin, Ether, Ripple,
            Litecoin, Dash, and Monero against the USD and other innovative
            digital currencies. Diversify your trading portfolio today with one
            of the industry’s safest providers of online trading. We offer
            cryptocurrencies on leverage with the advantage of short selling,
            delivering an ideal solution for hedging physical holdings. Explore
            our Best Crypto Currency Platform for optimal trading experiences.
          </p>
          <Button
            text="Open Account"
            onClick={handleClick}
            className="mt-6 px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
          />
        </section>

        {/* Chart Section */}
        <section className="bg-[#0b1e26] py-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
            {chartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#1b2d3a] p-5 rounded-2xl shadow-md text-white"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9">
                      <Image
                        src={item.icon}
                        alt={item.subtitle}
                        width={36}
                        height={36}
                        className="rounded-full object-contain"
                      />
                    </div>
                    <div className="leading-tight">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-xs text-gray-400">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right leading-tight">
                    <p className="text-[10px] text-gray-400">{item.currency}</p>
                    <p className="text-lg font-bold">{item.price}</p>
                    <p className={`text-xs font-medium ${item.changeColor}`}>
                      {item.change}
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="mt-4">
                  <Image
                    src={item.chart}
                    alt={`${item.title} chart`}
                    width={400}
                    height={100}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Footer */}
                <p className="mt-4 text-xs text-gray-500 flex items-center gap-1">
                  <span>©</span> Data Provider
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Accordion Section */}
        <section className="max-w-4xl mx-auto px-4 py-10">
          {accordionItems.map((item, index) => (
            <div key={index} className="border-b border-gray-700">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full py-4 text-left"
              >
                <span className="text-sm md:text-base">{item.title}</span>
                <FaChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="pb-4 text-sm text-gray-400">{item.content}</div>
              )}
            </div>
          ))}
        </section>
      </main>
      <InsightsSection />
      <Footer />
    </div>
  );
}
