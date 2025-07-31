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
      className={`bg-gradient-to-r from-[#927948]  to-[#43340c]  hover:from-[#43340c] hover:to-[#927948] text-gray-400 text-sm font-semibold cursor-pointer px-4 py-2 rounded-full transition duration-300 ${className} border border-[#927948]`}
    >
      {text}
    </button>
  );
}
