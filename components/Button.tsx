"use client";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string; // optional extra classes
}

export default function Button({ text, onClick, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-[#095A7B] via-[#0A517F] to-[#0A3C73]  hover:from-[#0A3C73] hover:to-[#095A7B] text-gray-400 text-sm font-semibold cursor-pointer px-4 py-2 rounded-full transition duration-300 ${className} border border-[#00D5FF]`}
    >
      {text}
    </button>
  );
}
