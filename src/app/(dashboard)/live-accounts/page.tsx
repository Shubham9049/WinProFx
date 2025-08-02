"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Wallet } from "lucide-react";
import emptyIcon from "../../../../assets/icons/empty_state.png";
import Button from "../../../../components/Button";
import RegisterModal from "../../../../components/CreateAccount";
import mt5 from "../../../../assets/mt5_logo.png";

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
  const [accountNo, setAccountNo] = useState("");
  const [balance, setBalance] = useState<string>("0.00");
  const [DWBalance, setDWBalance] = useState<string>("0.00");

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) return;

    const user = JSON.parse(userString);
    const email = user.email;

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/user/${email}`
      );
      const userData = res.data;

      if (userData && userData.accounts) {
        setAccounts(userData.accounts);
        const firstAccountNo = userData.accounts[0].accountNo;
        setAccountNo(firstAccountNo);
        fetchAccountSummary(firstAccountNo); // ✅ fetch balance info
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

  const fetchAccountSummary = async (accountNo: number) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/moneyplant/checkBalance`,
        {
          accountno: accountNo.toString(), // Sent in body as required
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = res.data;
      console.log(result);
      if (result.data?.response === "success") {
        const accountData = result.data;

        setBalance(accountData.balance);
        setDWBalance(accountData.DWBalance);
      } else {
        console.warn(
          "Account summary fetch failed:",
          result.data?.message || result.message
        );
      }
    } catch (error) {
      console.error("Failed to fetch account summary:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!isLoggedIn) return null;

  const handleClick = () => {
    alert("clicked");
  };

  return (
    <div className="h-[80vh] bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] px-6 md:px-12 py-10 text-white flex flex-col lg:flex-row gap-10">
      {/* Left Section */}
      <div className="flex-1 bg-[#121a2a] border border-gray-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold tracking-wider text-[var(--primary)]">
            Live MT5 Accounts
          </h2>
          {accounts.length === 0 && (
            <Button
              text="+ Create Account"
              onClick={() => setShowModal(true)}
            />
          )}
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
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Left: Basic Info */}
                  <div className="flex-1 space-y-2">
                    <p className="text-xs text-gray-400">Account Number</p>
                    <p className="text-xl font-semibold text-white">
                      {acc.accountNo}
                    </p>
                    <div className="bg-[var(--primary)]/20 px-3 py-1 inline-block rounded-full text-[var(--primary)] text-sm font-medium">
                      {acc.currency}
                    </div>
                  </div>

                  {/* Right: Account Summary */}
                  <div className="w-full lg:w-[400px] rounded-2xl p-6 bg-[#101d35] border border-[#2a3b58] text-white shadow-xl space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <Image
                          src={mt5}
                          alt="MT5 Icon"
                          width={48}
                          height={48}
                        />
                        <div>
                          <h2 className="text-lg font-semibold leading-tight">
                            MT {acc.accountNo} (Standard)
                          </h2>
                          <p className="text-sm text-gray-400 mt-1">
                            BALANCE : ${balance}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full">
                          Trade Now
                        </button>
                        <button className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full">
                          QUICK DEPOSIT
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-gray-400 flex items-center gap-2">
                            🖥️ SERVER
                          </p>
                          <p className="bg-[#17263e] text-white px-3 py-2 rounded-md text-sm">
                            WinprofX-Live
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-400 flex items-center gap-2">
                            🧮 LEVERAGE
                          </p>
                          <div className="flex justify-between items-center bg-[#17263e] px-3 py-2 rounded-md">
                            <span>1:500</span>
                            <button className="text-blue-400 text-xs underline">
                              UPDATE LEVERAGE
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-gray-400 flex items-center gap-2">
                            📈 EQUITY
                          </p>
                          <p className="bg-[#17263e] px-3 py-2 rounded-md">
                            ${balance}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-400 flex items-center gap-2">
                            💰 FREE MARGIN
                          </p>
                          <p className="bg-[#17263e] px-3 py-2 rounded-md">
                            ${DWBalance}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-400 flex items-center gap-2">
                            📊 MARGIN
                          </p>
                          <p className="bg-[#17263e] px-3 py-2 rounded-md">
                            $0
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-400 flex items-center gap-2">
                            📐 MARGIN LEVEL
                          </p>
                          <p className="bg-[#17263e] px-3 py-2 rounded-md">
                            0%
                          </p>
                        </div>
                        <div className="col-span-2 space-y-1">
                          <p className="text-gray-400 flex items-center gap-2">
                            🔄 FLOATING PL
                          </p>
                          <p className="bg-[#17263e] px-3 py-2 rounded-md">
                            $0
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md">
                        Update Password
                      </button>
                      <button className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md">
                        Deposit
                      </button>
                      <button className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md">
                        Withdraw
                      </button>
                    </div>
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

      <RegisterModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          fetchUserData(); // ✅ Refresh account list after modal closes
        }}
      />
    </div>
  );
}
