"use client";
import commodity from "../assets/icons/commodities.svg";
import forex from "../assets/icons/forex.svg";
import indices from "../assets/icons/indices.svg";
import crypto from "../assets/icons/crypto.svg";
import metals from "../assets/icons/metals.svg";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "Commodities",
    image: commodity,
    description:
      "Take advantage of market volatility and choose from CFDs on spot commodities and futures. At WINP...",
    link: "/commdities",
  },
  {
    title: "Forex",
    image: forex,
    description:
      "Forex or the Foreign Exchange is a global market where currencies trade. It vastly oversh...",
    link: "/forex",
  },
  {
    title: "Indices",
    image: indices,
    description:
      "Indices are a measurement of the price performance of a group of shares from an exchang...",
    link: "/indices",
  },
  {
    title: "Crypto Currency",
    image: crypto,
    description:
      "Cryptocurrencies also known as digital currencies are fast-growing investment instrum...",
    link: "/crypto",
  },
  {
    title: "Metals",
    image: metals,
    description:
      "Spot Metal Trading holds a special place in the heart of every trader. Metals have attra...",
    link: "/metals",
  },
];

export default function TradeSection() {
  return (
    <section className="bg-[#07121F] text-white py-16">
      <div className="w-11/12 md:w-4/5 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          WHAT YOU CAN <span className="text-cyan-400">TRADE?</span>
        </h2>
        <p className="text-gray-400 mb-10 max-w-3xl">
          We're here to help during market volatility. With WinproFX you can
          trade on major markets across 3 asset classes including FX, Metals,
          and CFDs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden bg-[#0E1D2B] rounded-3xl h-[330px] p-6"
            >
              {/* Circular zoom-in background on hover */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 scale-0 rounded-full bg-cyan-900 transition-transform duration-700 ease-in-out group-hover:scale-[3]" />
              </div>

              {/* Content container */}
              <div className="flex flex-col justify-end h-full relative z-10 transition-all duration-700 ease-in-out group-hover:pt-6 ">
                {/* Image */}
                <div className="mb-4 transition-all duration-700 ease-in-out transform group-hover:-translate-y-6 ">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16"
                  />
                </div>

                {/* Title + Description */}
                <div className="transition-all duration-700 ease-in-out transform group-hover:-translate-y-2 px-2">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300 line-clamp-2 group-hover:line-clamp-none group-hover:mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Learn More */}
                <Link
                  href={item.link}
                  className="text-sm text-cyan-300 underline mt-2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:translate-y-0 translate-y-6"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
