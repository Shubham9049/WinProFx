"use client";

import { useEffect, useRef } from "react";
import { FaHeadset, FaRegClock, FaShieldAlt } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import "../src/app/globals.css";

const cardContent = [
  {
    icon: <FaRegClock className="text-2xl text-cyan-400" />,
    title: "Crypto Withdraw in",
    bold: "30 minutes",
    description:
      '"Unlock swift financial flexibility with our 30-minute withdrawal guarantee."',
  },
  {
    icon: <FiGift className="text-2xl text-cyan-400" />,
    title: "Trade daily",
    bold: "Win rewards",
    description:
      '"Daily trades, daily wins – fuel your success in every market move."',
  },
  {
    icon: <FaHeadset className="text-2xl text-cyan-400" />,
    title: "Award Winning",
    bold: "Customer Support",
    description: "Delivering unparalleled service excellence!",
  },
  {
    icon: <FaShieldAlt className="text-2xl text-cyan-400" />,
    title: "Negative balance",
    bold: "Protection",
    description:
      '"Trade confidently with built-in negative balance protection for financial security."',
  },
];

export default function BenefitsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let currentIndex = 0;

    const interval = setInterval(() => {
      const cardWidth = scrollContainer.clientWidth;
      currentIndex++;

      if (currentIndex >= cardContent.length) {
        currentIndex = 0;
      }

      scrollContainer.scrollTo({
        left: cardWidth * currentIndex,
        behavior: "smooth",
      });
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-white py-12">
      <div className="w-11/12 md:w-4/5 mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div data-aos="fade-right">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Benefits of <span className="text-cyan-400">Trading</span> With Us
          </h2>
          <p className="text-gray-400 mt-4 max-w-md">
            Discover seamless trading with us, where transparency and advanced
            technology meet for your financial success.
          </p>
          <button className="mt-6 relative overflow-hidden px-5 py-2 border border-cyan-400 text-cyan-400 rounded-full group">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Start Trading →
            </span>
            <span className="absolute inset-0 bg-[var(--primary)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></span>
          </button>
        </div>

        {/* Right Cards */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto md:overflow-visible hide-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {cardContent.map((card, index) => (
            <div
              key={index}
              className="group snap-start w-full min-w-full md:min-w-0 [perspective:1000px] h-52"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] rotateY-mobile">
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden border border-cyan-900 rounded-3xl p-5 flex flex-col justify-between gap-3 bg-[#0b1622]">
                  {card.icon}
                  <div>
                    <p className="text-gray-300 text-sm">{card.title}</p>
                    <p className="text-xl font-bold">{card.bold}</p>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)] bg-cyan-900 rounded-3xl p-5 flex flex-col gap-3">
                  {card.icon}
                  <p className="text-gray-300 text-sm">{card.title}</p>
                  <p className="text-xl font-bold">{card.bold}</p>
                  <p className="text-sm text-gray-200">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
