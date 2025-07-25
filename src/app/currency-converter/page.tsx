"use client";

import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I select the base currency?",
    answer:
      "You can select your base currency from the six available dropdown lists. This will be the currency you are converting from",
  },
  {
    question: "How do I enter the amount to convert?",
    answer:
      "Simply enter the amount you wish to convert from your base currency in the designated field. The converter will automatically calculate the equivalent values in the selected currencies.",
  },
  {
    question: "Are the exchange rates updated in real-time?",
    answer:
      "Yes, the exchange rates used by the WinProFX Currency Converter are updated in real-time to ensure accuracy.",
  },
];

export default function CurrencyCoverter() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-[#121E2C]">
      <Navbar />
      <section className=" text-white pb-8 text-center pt-36">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-4">
          <span className="text-white font-medium">
            <Link href={"/"}>Home</Link>
          </span>{" "}
          / Currency Converter
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold leading-snug max-w-4xl mx-auto mb-4">
          Currency Converter
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-400 mb-6">
          Calculate live exchange rates and convert all major and exotic
          currency pairs effortlessly with our user-friendly currency converter.
        </p>
      </section>

      <section className=" text-white py-12">
        <div className="w-11/12 md:w-4/5 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 t">
            Using the{" "}
            <span className="text-cyan-400">WinproFX Currency Converter</span>
          </h2>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
            Our currency converter assists you in swiftly and accurately
            converting one currency to another with real-time rates. This tool
            is essential when making deposits and withdrawals on your trading
            account.
          </p>

          <ul className="text-left text-gray-300 text-base space-y-4  list-disc pl-5">
            <li>
              From the available six dropdown lists, select your base currency.
            </li>
            <li>Choose up to five other currencies to convert to.</li>
            <li>
              Enter the amount you want to convert from the base currency.
            </li>
            <li>
              The currency converter will automatically calculate and display
              the exchange rates for your chosen currencies.
            </li>
          </ul>
        </div>
      </section>

      <section className=" text-white py-16">
        <div className="w-11/12 md:w-4/5 mx-auto">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Frequently
            <span className="text-cyan-400"> asked questions</span>
          </h2>
          <p className="text-gray-400 mb-10 text-base md:text-lg">
            Unlock the answers you need with our FAQs. From account setup to
            trading strategies, find quick solutions to common queries, ensuring
            your trading journey with Billion Dollar FX is smooth and
            successful.
          </p>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-700 pb-2">
                <button
                  onClick={() => toggleIndex(i)}
                  className="w-full flex items-center justify-between text-left text-white text-lg font-medium"
                >
                  {faq.question}
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-cyan-400">
                    {activeIndex === i ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </span>
                </button>

                {/* Animated Answer */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    activeIndex === i
                      ? "max-h-40 opacity-100 mt-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-400 text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
