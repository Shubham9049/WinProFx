"use client";

import { FaClock, FaGift, FaHeadset, FaShieldAlt } from "react-icons/fa";
import "../src/app/globals.css";

const cardContent = [
  {
    icon: <FaClock className="text-2xl text-cyan-400" />,
    title: "Crypto Withdraw in",
    bold: "30 minutes",
    description:
      '"Unlock swift financial flexibility with our 30-minute withdrawal guarantee."',
  },
  {
    icon: <FaGift className="text-2xl text-cyan-400" />,
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

export default function Home() {
  return (
    <section className=" text-white py-12">
      <div className="w-11/12 md:w-4/5 mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
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

        {/* Right Flip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cardContent.map((card, index) => (
            <div key={index} className="group [perspective:1000px] w-full h-52">
              <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden  border border-cyan-900 rounded-xl p-5 flex flex-col gap-3">
                  {card.icon}
                  <p className="text-gray-300 text-sm">{card.title}</p>
                  <p className="text-xl font-bold">{card.bold}</p>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)] bg-cyan-900 rounded-xl p-5 flex flex-col gap-3">
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
    </section>
  );
}
