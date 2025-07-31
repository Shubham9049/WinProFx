"use client";

import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is Billion Dollar FX?",
    answer: "Billion Dollar FX is a leading forex trading platform...",
  },
  {
    question: "How do I start trading with Billion Dollar FX?",
    answer: "To start trading, create an account on Billion Dollar FX...",
  },
  {
    question: "Which Financial instruments can I trade with Billion Dollar FX?",
    answer: "You can trade FOREX, CFDs, commodities...",
  },
  {
    question: "How can I deposit and withdraw funds on Billion Dollar FX?",
    answer: "You can deposit and withdraw through multiple payment methods...",
  },
  {
    question: "What trading platforms does Billion Dollar FX support?",
    answer: "Billion Dollar FX supports MT4 and web platforms...",
  },
  {
    question:
      "Does Billion Dollar FX provide educational resources for traders?",
    answer: "Yes, we offer blogs, videos, and guides...",
  },
  {
    question: "How can I contact Billion Dollar FX customer support?",
    answer: "You can contact our support via email, live chat...",
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClick = () => alert("Account Opening Started!");
  return (
    <div className="bg-[var(--bg)] px-2">
      <Navbar />
      <section className=" text-white pb-16 text-center pt-36">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-4">
          <span className="text-white font-medium">
            <Link href={"/"}>Home</Link>
          </span>{" "}
          / About Us
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold leading-snug max-w-4xl mx-auto mb-4">
          Pioneering Excellence: Redefining Trading <br />
          Standards at Billion Dollar FX
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-400 mb-6">
          Empowering Traders Worldwide
        </p>

        {/* Paragraph */}
        <p className="text-gray-400 max-w-4xl mx-auto text-base leading-relaxed">
          Welcome to Billion Dollar FX, the world&#39;s leading Best Popular
          Platform Forex Trading designed for traders of all levels. For those
          interested in FOREX, CFD, or commodities markets, we strive to provide
          programs, services, and information that will make them more
          profitable, self-sufficient, and efficient.
        </p>
      </section>

      <section className=" text-white py-12  text-center">
        {/* Section Heading */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Discovering Distinction: What Sets Our Journey Apart?
          </h2>
          <p className="text-gray-400 mb-12 text-base md:text-lg">
            Envisioned as a pioneering force, Billion Dollar FX aspires to be a
            catalyst for positive change in the world of finance. We aim to
            provide a dynamic and secure trading environment that fosters
            success, creating opportunities for both seasoned professionals and
            budding enthusiasts.
          </p>
        </div>

        {/* Grid Items */}
        <div className="w-11/12 md:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          {/* Item 1 */}
          <div>
            <h3 className="text-[var(--primary)] font-semibold text-xl mb-2">
              Innovative Aspirations
            </h3>
            <p className="text-gray-300">
              Breaking free from conventions, our journey is marked by a
              relentless pursuit of innovation, weaving a narrative that
              transcends the ordinary.
            </p>
          </div>

          {/* Item 2 */}
          <div>
            <h3 className="text-[var(--primary)] font-semibold text-xl mb-2">
              Client Empowerment
            </h3>
            <p className="text-gray-300">
              It&#39;s more than a business; it&#39;s a mission to empower. Our
              commitment lies in elevating each client, forging a path where
              success is not just a possibility but an inevitability.
            </p>
          </div>

          {/* Item 3 */}
          <div>
            <h3 className="text-[var(--primary)] font-semibold text-xl mb-2">
              Trailblazing Integrity
            </h3>
            <p className="text-gray-300">
              Beyond transactions, we uphold a standard of unwavering integrity.
              Every interaction is a testament to our commitment to
              transparency, trust, and ethical conduct.
            </p>
          </div>

          {/* Item 4 */}
          <div>
            <h3 className="text-[var(--primary)] font-semibold text-xl mb-2">
              Community of Achievers
            </h3>
            <p className="text-gray-300">
              We&#39;re not just a platform; we&#39;re a thriving community of
              achievers. Join a collective journey where aspirations meet
              accomplishments, and individual successes contribute to a shared
              legacy.
            </p>
          </div>
        </div>
      </section>

      <section className=" text-white py-16">
        <div className="w-11/12 md:w-4/5 mx-auto">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            FAQs: Your Guide to{" "}
            <span className="text-[var(--primary)]">Seamless Trading</span>
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
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-[var(--primary)]">
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

      <section className="w-11/12 md:w-4/5 mx-auto py-12 space-y-5">
        <h2 className="text-center max-w-3xl mx-auto text-gray-200 text-xl md:text-2xl font-bold">
          Embark on a transformative trading journey with us — where trading
          isn&#39;t just an action, it&#39;s a difference. Trade with us, be the
          difference.
        </h2>
        <p className="text-gray-400 text-center max-w-4xl mx-auto">
          Dive into a world where every trade creates a ripple of impact. Join
          us in shaping a unique trading experience that not only sets you apart
          but also makes a positive difference. Trade with purpose, trade with
          us.
        </p>
        <div className="flex justify-center">
          <Button text="Start Your Journey Today" onClick={handleClick} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
