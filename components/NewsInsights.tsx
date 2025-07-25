"use client";
import Image from "next/image";
import logo from "../assets/logo.webp";

const newsLogos = [
  {
    image: logo,
    text: "Street Insider",
  },
  {
    image: logo,
    text: "Yahoo Finance",
  },
  {
    image: logo,
    text: "Digital Journal",
  },
  {
    image: logo,
    text: "Whig Standard",
  },
];

export default function NewsInsights() {
  return (
    <section className="bg-[#0A1929] text-white py-16">
      <div className="w-11/12 md:w-4/5 mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          News & <span className="text-cyan-400">Insights</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Stay informed with our latest market updates and expert insights,
          empowering you to make well-informed decisions in the world of
          finance.
        </p>

        <div className="flex flex-wrap justify-center items-end gap-6">
          {newsLogos.map((logo, i) => (
            <div
              key={i}
              className={`w-40 h-28 bg-white rounded-md p-4 cursor-pointer transition-all duration-500
                hover:-translate-y-3 hover:rotate-0 hover:shadow-lg
                ${
                  i === 0
                    ? "-rotate-[8deg]"
                    : i === 1
                    ? "-rotate-[4deg]"
                    : i === 2
                    ? "rotate-[3deg]"
                    : "rotate-[0deg] border-4 border-cyan-500"
                }
              `}
              style={{ transformOrigin: "bottom center" }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={logo.image}
                  alt={logo.text}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <button className="mt-10 px-6 py-2 border border-cyan-400 rounded-full text-cyan-300 hover:bg-cyan-400 hover:text-black transition">
          Show more →
        </button>
      </div>
    </section>
  );
}
