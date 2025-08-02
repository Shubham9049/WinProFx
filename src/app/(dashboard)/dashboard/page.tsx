"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import emptyIcon from "../../../../assets/icons/empty_state.png"; // Update if needed
import Button from "../../../../components/Button";
import RegisterModal from "../../../../components/CreateAccount"; // adjust path as needed

export default function DepositsPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accounts, setAccounts] = useState([]); // Simulating no accounts
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) return null;
  const handleClick = () => {
    alert("clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] px-6 md:px-12 py-10 text-white flex flex-col lg:flex-row gap-10">
      {/* Left Section */}
      <div className="flex-1 bg-[#121a2a] border border-gray-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold tracking-wider text-[var(--primary)]">
            Live MT5 Accounts
          </h2>
          <Button text="+ Create Account" onClick={() => setShowModal(true)} />
        </div>

        {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <Image
              src={emptyIcon}
              alt="No Live Accounts"
              width={140}
              height={140}
              className="mb-6 grayscale opacity-80"
            />
            <p className="text-gray-400 text-sm">
              You don’t have any live accounts yet.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Click &#34;Create Account&#34; to get started.
            </p>
          </div>
        ) : (
          <div>{/* Render accounts */}</div>
        )}

        <div className="absolute bottom-6 right-8 text-xs text-gray-600">
          Secure MT5 Trading | Regulated
        </div>
      </div>

      {/* Right Section - Account Summary */}
      <div className="w-full lg:w-[360px] rounded-2xl p-6 bg-white/5 backdrop-blur border border-gray-700 shadow-xl space-y-6">
        <h2 className="text-lg font-semibold text-[var(--primary)] tracking-wide">
          Account Summary
        </h2>

        <div className="space-y-5">
          <div className="bg-[#0d1b2a] p-4 rounded-xl flex justify-between items-center">
            <div className="text-gray-400 text-sm">Total Deposited</div>
            <div className="text-white font-bold">$0.00</div>
          </div>
          <div className="flex justify-center">
            <Button text="Make a Deposit" onClick={handleClick} />
          </div>

          <div className="bg-[#0d1b2a] p-4 rounded-xl flex justify-between items-center">
            <div className="text-gray-400 text-sm">Total Withdrawn</div>
            <div className="text-white font-bold">$0.00</div>
          </div>
          <div className="flex justify-center">
            <Button text="Withdraw Funds" onClick={handleClick} />
          </div>
        </div>
      </div>
      <RegisterModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
