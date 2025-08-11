"use client";
import { useState } from "react";

interface GlossaryItem {
  term: string;
  definition: string;
}

const glossaryData: GlossaryItem[] = [
  {
    term: "Abandon",
    definition:
      "Abandon literally means rejection (from the French. Abandon). As applied to the sphere of financial operations, abandon can be a waiver of any right or property, withdrawal from a transaction, waiver of using an option until its full expiration date.",
  },
  {
    term: "Accelerator/Decelerator",
    definition:
      "The Accelerator/Decelerator technical indicator shows the acceleration or deceleration of the current market driving force.",
  },
  {
    term: "Accumulation/Distribution",
    definition:
      "Accumulation/Distribution is an indicator designed to reflect cumulative inflows and outflows of money by comparing closing prices with corresponding highs and lows.",
  },
  {
    term: "ADR (American Depository Receipts)",
    definition:
      "The American Depositary Receipt is used to trade in securities of foreign companies in the United States. Shares of foreign companies are acquired by the American depositary bank in the process of listing these shares on US stock exchanges. This scheme has been used since 1927. Receipts (ADRs) are denominated in US dollars. In the same way, they are freely traded in Europe. ADRs are a tool for raising capital in the US and international markets. They may have different names that meet the requirements of a particular market.",
  },
  {
    term: "AMEX",
    definition:
      "World Stock Exchange, which grew out of a small company of stock traders in the second largest US stock exchange. Its distinctive feature is that shares of firms that are in the development stage (small and medium business) are traded here. Two major indices are calculated on this exchange: AMEX Major Market Index and AMEX Market Value Index.",
  },
  {
    term: "Arbitrage",
    definition:
      "Simultaneous purchase of an undervalued financial asset and sale of its overvalued equivalent in order to make further risk-free profit from the price difference of assets which emerged as a result of temporary market inefficiency.",
  },
  {
    term: "Ascending Triangle",
    definition:
      "The Ascending triangle graphical price pattern is a chart pattern of an existing trend continuation, which is usually formed in an uptrend and confirms its further direction.",
  },
  {
    term: "Ask price",
    definition:
      "The ask price is the price at which one buys any financial instrument.",
  },
  {
    term: "Ask Rate",
    definition: "See ask price",
  },
  {
    term: "Asset",
    definition:
      "An instrument which has an economic value and may generate income in future.",
  },
  {
    term: "AUDUSD",
    definition:
      "The Australian dollar and the US dollar currency pair. In this pair the Australian dollar is the base currency, and the US dollar is the quoted one.",
  },
  { term: "Aussie", definition: "Slang term  for the Australian Dollar." },
  {
    term: "Automated Trading",
    definition:
      "Automated trading gives an opportunity to make the trading process absolutely automated.",
  },
];

export default function ForexGlossary() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGlossary = glossaryData.filter((item) =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-black text-white py-10 px-4 sm:px-10">
      {/* Top description */}
      <p className="max-w-4xl mb-6 text-gray-300">
        Explore our detailed Forex Glossary, a complete guide to essential
        trading terms and concepts. From technical indicators like RSI and MACD
        to financial terms like bid/ask spread, leverage, and volatility, this
        glossary is designed to help traders of all levels enhance their
        understanding of the Forex market.
      </p>

      {/* Glossary Title */}
      <h2 className="text-3xl font-bold mb-6">Forex Glossary</h2>

      {/* Search bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-500 bg-white text-black w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Glossary List */}
      <div className="space-y-2">
        {filteredGlossary.map((item) => (
          <details
            key={item.term}
            className="border border-white rounded-md overflow-hidden"
          >
            <summary className="cursor-pointer px-3 py-2 font-bold bg-black text-white">
              {item.term}
            </summary>
            <p className="px-3 py-2 text-sm">{item.definition}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
