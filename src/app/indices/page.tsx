"use client";

import { div } from "framer-motion/client";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import InsightsSection from "../../../components/Inside_Contact";

export default function Indices() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleClick = () => alert("Account Opening Started!");

  const chartItems = [
    {
      id: 1,
      label: "100",
      labelBg: "bg-red-600",
      title: "UK 100",
      subtitle: "FTSE 100 Index",
      price: "1.0932",
      currency: "USD",
      change: "-0.00072 -0.07%",
      changeColor: "text-red-400",
      chart: "https://winprofx.com/_next/static/media/grap.37f414da.svg",
    },
    {
      id: 2,
      label: "30",
      labelBg: "bg-cyan-500",
      title: "DJI",
      subtitle: "Dow Jones Industrial",
      price: "1.0932",
      currency: "USD",
      change: "+0.00072 +0.07%",
      changeColor: "text-green-400",
      chart: "https://winprofx.com/_next/static/media/grap.37f414da.svg",
    },
    {
      id: 3,
      label: "100",
      labelBg: "bg-cyan-500",
      title: "Nasdaq 100 Index",
      subtitle: "NASDAQ, INC.",
      price: "1.0932",
      currency: "USD",
      change: "+0.00072 +0.07%",
      changeColor: "text-green-400",
      chart: "https://winprofx.com/_next/static/media/grap.37f414da.svg",
    },
    {
      id: 4,
      label: "500",
      labelBg: "bg-red-600",
      title: "US500",
      subtitle: "US500",
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
            WHAT ARE<span className="text-cyan-400"> INDICES</span>?
          </h1>
          <p className="mt-4 text-gray-400 w-11/12 mx-auto">
            Indices are a measurement of the price performance of a group of
            shares from an exchange. For example, the FTSE 100 tracks the 100
            largest companies on the London Stock Exchange (LSE). Trading
            indices enables you to get exposure to an entire economy or sector
            at once, while only having to open a single position. For optimal
            trading explore our Best Stock Indices Platform for comprehensive
            and efficient trading options.
          </p>
          <Button
            text="Open Account"
            onClick={handleClick}
            className="mt-6 px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
          />
        </section>

        {/* Chart Section */}
        <section className="bg-[#072029] py-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
            {chartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#0b1e26] p-5 rounded-2xl shadow-md text-white"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`text-xs text-white font-bold w-9 h-9 flex items-center justify-center rounded-full ${item.labelBg}`}
                    >
                      {item.label}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">{item.title}</h3>
                      <p className="text-xs text-gray-400">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-300">{item.currency}</p>
                    <p className="text-xl font-semibold">{item.price}</p>
                    <p className={`text-xs ${item.changeColor}`}>
                      {item.change}
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <Image
                  src={item.chart}
                  alt="chart"
                  width={400}
                  height={100}
                  className="w-full"
                />

                {/* Footer */}
                <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
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
