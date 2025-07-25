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

export default function CurrencyCalculator() {
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
          / Currency Calculator
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold leading-snug max-w-4xl mx-auto mb-4">
          Currency Calculator
        </h1>
      </section>

      <section className="text-white bg-[#121E2C] py-12">
        {/* Disclaimer */}
        <p className="text-center text-gray-400 max-w-3xl mx-auto px-4 text-sm mb-12">
          Disclaimer: The trading calculator is provided for illustrative
          purposes only. The results presented by this calculator are for
          educational and estimation purposes and you should not rely upon it as
          being complete and for making investment decisions. Real-time results
          can only be determined at the time of order execution.
        </p>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-16">
          How to use the <span className="text-white">WinproFX</span>{" "}
          <span className="text-cyan-400">Trading Calculator</span>
        </h2>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 w-11/12 md:w-4/5 mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center max-w-sm relative">
            <span className="text-5xl text-cyan-300 font-semibold mb-4">1</span>
            <p className="text-gray-300 text-base">
              Choose your WinproFX account type and specify your account's
              leverage and currency.
            </p>
            {/* Line & Diamond to Step 2 */}
            <div className="hidden md:flex items-center absolute top-6 right-[-110px] w-[250px] h-[1px] bg-cyan-700">
              <div className="w-3 h-3 bg-cyan-700 rotate-45 mx-auto" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center max-w-sm relative">
            <span className="text-5xl text-cyan-300 font-semibold mb-4">2</span>
            <p className="text-gray-300 text-base">
              Select your desired trading instrument from the available list.
            </p>
            {/* Line & Diamond to Step 3 */}
            <div className="hidden md:flex items-center absolute top-6 right-[-150px] w-[250px] h-[1px] bg-cyan-700">
              <div className="w-3 h-3 bg-cyan-700 rotate-45 mx-auto" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center max-w-sm">
            <span className="text-5xl text-cyan-300 font-semibold mb-4">3</span>
            <p className="text-gray-300 text-base">
              Determine your trade's lot size and proceed to calculate by
              clicking the 'Calculate' button.
            </p>
          </div>
        </div>
      </section>

      <section className=" text-white py-16">
        <div className="w-11/12 md:w-4/5 mx-auto">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Forex
            <span className="text-cyan-400"> Currency Calculator</span>
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
