"use client";

import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const videoTabs = [
  {
    label: "Part 1. Basics of Forex",
    videoId: "jx2nPMmw5Mc", // replace with actual video ID
  },
  {
    label: "Part 2. Basics of Forex",
    videoId: "oUyNo9ISsAM", // replace with actual video ID
  },
];

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

export default function Education() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

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
          / Education
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold leading-snug max-w-4xl mx-auto mb-4">
          Forex basics: video course
        </h1>
        <p className="text-center text-gray-400 max-w-4xl mx-auto px-4 text-medium">
          This video course for beginners will guide you through the main
          aspects of Forex trading. You will learn how the Forex market works
          and how you can profit from it. Study the essential Forex terminology,
          learn how to take your first steps in trading, and start developing
          your trading strategy with the Best Basics of Forex Trading course.
        </p>
      </section>

      <section className="text-white py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-6  mb-6">
            {videoTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`pb-2 font-medium transition-all ${
                  activeTab === i
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-cyan-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Video */}
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoTabs[activeTab].videoId}`}
              title={videoTabs[activeTab].label}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Caption */}
          <p className="mt-4 text-start text-sm md:text-2xl text-gray-300">
            {videoTabs[activeTab].label}
          </p>
        </div>
      </section>

      <section className=" text-white py-16">
        <div className="w-11/12 md:w-4/5 mx-auto">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-5">
            FAQs: Your Guide to
            <span className="text-cyan-400"> Seamless Trading</span>
          </h2>

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
