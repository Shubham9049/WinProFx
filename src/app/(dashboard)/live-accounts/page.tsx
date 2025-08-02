"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Wallet } from "lucide-react";
import emptyIcon from "../../../../assets/icons/empty_state.png";
import Button from "../../../../components/Button";
import RegisterModal from "../../../../components/CreateAccount";

interface Account {
  _id: string;
  accountNo: number;
  currency: string;
  // add more fields if needed
}

export default function LiveAccounts() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      router.replace("/login");
      return;
    }

    const user = JSON.parse(userString);
    const email = user.email;

    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/user/${email}`
        );
        const userData = res.data;

        if (userData && userData.accounts) {
          setAccounts(userData.accounts);
          console.log(accounts);
        } else {
          setAccounts([]);
        }

        setIsLoggedIn(true);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setAccounts([]);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {accounts.map((acc) => (
              <div
                key={acc._id}
                className="bg-[#0d1b2a] border border-gray-700 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Account Number</p>
                    <p className="text-xl font-semibold text-white">
                      {acc.accountNo}
                    </p>
                  </div>
                  <div className="bg-[var(--primary)]/20 px-3 py-1 rounded-full text-[var(--primary)] text-sm font-medium">
                    {acc.currency}
                  </div>
                </div>

                {/* Optional details */}
                {/* <p className="text-sm text-gray-400 mt-2">Leverage: 1:100</p>
      <p className="text-sm text-gray-400">Status: Active</p> */}
              </div>
            ))}
          </div>
        )}

        <div className="absolute bottom-6 right-8 text-xs text-gray-600">
          Secure MT5 Trading | Regulated
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full h-fit lg:w-[360px] rounded-2xl p-6 bg-white/5 backdrop-blur border border-gray-700 shadow-xl space-y-6">
        <div className="bg-[var(--primary)]/20 p-3 w-fit rounded-full">
          <Wallet className="text-[var(--primary)]" size={24} />
        </div>
        <h2 className="text-lg font-semibold text-[var(--primary)] tracking-wide">
          Enjoy Easy Trading and
          <br />
          Quick Transactions!
        </h2>

        <p className="text-sm text-gray-300 leading-relaxed">
          Experience seamless order execution, instant deposits & withdrawals,
          and an intuitive platform designed to empower your trading journey!
        </p>

        <div className="flex justify-center pt-2">
          <Button text="Deposit Now" onClick={handleClick} className="w-full" />
        </div>
      </div>

      <RegisterModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
