"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import evolving from "../assets/icons/evolving.svg";
import awards from "../assets/icons/awards.svg";
import country from "../assets/icons/countries.svg";
import trading from "../assets/icons/trading.svg";

interface StatItem {
  icon: string;
  endValue?: number;
  title?: string;
  subtitle: string;
  suffix?: string;
}

const statsData: StatItem[] = [
  {
    icon: evolving.src,
    title: "Evolving",
    subtitle: "In The Market",
  },
  {
    icon: awards.src,
    endValue: 40,
    subtitle: "Awards",
    suffix: "+",
  },
  {
    icon: country.src,
    endValue: 105,
    subtitle: "Countries Covered",
    suffix: "+",
  },
  {
    icon: trading.src,
    endValue: 300,
    subtitle: "Trading Instruments",
    suffix: "+",
  },
];

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className="w-11/12 md:w-4/5 mx-auto text-white py-12 font-montserrat"
    >
      {/* Heading */}
      <div className="text-start mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Invest With Fastest Growing Broker <br />
          <span className="text-cyan-400">Asia 2024</span>
        </h2>
        <hr className="border-cyan-400 border-t-1 mt-4" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
        {statsData.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={stat.icon}
              alt={stat.subtitle}
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-2xl font-bold mb-1">
              {typeof stat.endValue === "number" && inView ? (
                <CountUp
                  end={stat.endValue}
                  duration={2}
                  suffix={stat.suffix}
                />
              ) : (
                stat.title
              )}
            </h3>
            <p className="text-md text-gray-300">{stat.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
