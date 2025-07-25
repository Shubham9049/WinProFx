"use client";

import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import img1 from "../../../assets/icons/feature1.png";
import img2 from "../../../assets/icons/feature2.png";
import img3 from "../../../assets/icons/feature3.png";
import Image from "next/image";

const faqs = [
  {
    question: "Which tools on our platform offer the best market predictions?",
    answer:
      "Utilize the Economic Calendar to track important economic events and data releases. Stay updated with real-time news through FXStreet News and gain insights from Trading Central WebTV.",
  },
  {
    question:
      "What tools on our website are best for analyzing trading patterns?",
    answer:
      "WinProFX provides a combination of fundamental and technical analysis tools to help you predict price movements and analyze trading patterns. Tools are free to use and easily accessible, allowing you to plan your trades confidently and effectively.",
  },
  {
    question:
      "Where can I access free trading signals on the WinproFX website?",
    answer:
      "You can access free trading signals from Trading Central in your Personal Area and the WinProFX Trade app. These signals incorporate various analytical approaches, providing insights on expected trends, and are valuable for both beginners and experienced traders to plan their strategies and trades.",
  },
];

const features = [
  {
    title: "Strategic",
    highlight: "Trading Signals",
    content:
      "Make optimal use of Trading Central&#39;s signals to formulate your trade plans and techniques. These signals combine a number of analytical techniques, providing traders with a useful tool across all periods and market conditions. You may easily access them through the WinproFX Trade app or your WinproFX Personal Area.",
    image: img1,
  },
  {
    title: "Real-Time",
    highlight: "Market News from WinproFX",
    content:
      "Stay up to date with market news and the most recent updates from the FXStreet News team in real time. Use the WinProFX Trade app or your WinProFX Personal Area to gain access to this useful data.",
    image: img2,
  },
  {
    title: "Advanced",
    highlight: "Charting Tools",
    content:
      "Analyze trends and execute strategies with our advanced charting tools. Packed with indicators and drawing tools to empower your decision-making process across all major asset classes.",
    image: img3,
  },
];

export default function EconomicCalendar() {
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
          / Economic Calendar
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold leading-snug max-w-4xl mx-auto mb-4">
          Economic Calendar
        </h1>
      </section>

      <section className=" text-white py-12">
        <div className="w-11/12 md:w-4/5 mx-auto">
          {/* Title */}
          <h2 className="text-xl font-bold mb-6">
            Understanding and Utilizing the Forex Economic Calendar
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-medium  leading-relaxed mb-6">
            A Forex Economic Calendar is an invaluable tool for traders,
            enabling them to monitor and analyze events that drive market
            movements and forecast price changes. It lists significant national
            and international news events in chronological order. Key events
            such as monetary policy decisions, economic indicators, GDP
            announcements, Non-Farm Payrolls (NFP) figures, and interest rate
            changes are included, as they can heavily influence financial
            markets.
          </p>

          <p className="text-gray-400 text-medium  leading-relaxed mb-6">
            Traders receive timely notifications about these events, ensuring
            they stay informed about the timing and potential impact on various
            instruments. These notifications are accessible under the{" "}
            <span className="text-white font-semibold">
              &quot;Mailbox&quot;
            </span>{" "}
            tab on your trading platform. It&apos;s important to note that the
            impact of economic news can differ for each instrument.
          </p>

          {/* Subheading */}
          <h3 className="text-xl font-semibold mb-4">
            Why You Should Use the Forex Economic Calendar
          </h3>

          {/* Benefits */}
          <p className="text-gray-400 text-medium  leading-relaxed">
            A Forex Economic Calendar is essential for keeping abreast of
            upcoming news, reports, and announcements. These events can
            significantly affect the volatility of forex currency pairs, stocks,
            and other markets. By using the calendar, traders can plan their
            trades more effectively and stay informed about chart patterns and
            indicators that may be impacted. Referring to the calendar before
            the trading day is a prudent practice, as these events can trigger
            significant price movements when released.
          </p>
        </div>
      </section>

      <section className=" text-white py-16">
        <div className="w-11/12 md:w-4/5 mx-auto">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Frequently
            <span className="text-cyan-400">asked questions</span>
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
