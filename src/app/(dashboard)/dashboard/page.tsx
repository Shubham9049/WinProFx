"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import emptyIcon from "../../../../assets/icons/empty_state.png"; // Update if needed
import Button from "../../../../components/Button";
import RegisterModal from "../../../../components/CreateAccount"; // adjust path as needed
import axios from "axios";
import AddBalanceModal from "../../../../components/AddBalanceModal";

interface Account {
  _id: string;
  accountNo: number;
  currency: string;
  // add more fields if needed
}

export default function DepositsPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [accountNo, setAccountNo] = useState("");
  const [balance, setBalance] = useState<string>("0.00");
  const [DWBalance, setDWBalance] = useState<string>("0.00");
  const [showDepositModal, setShowDepositModal] = useState(false);

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
      if (
        userData &&
        Array.isArray(userData.accounts) &&
        userData.accounts.length > 0
      ) {
        setAccounts(userData.accounts);
        const firstAccountNo = userData.accounts[0].accountNo;
        setAccountNo(firstAccountNo);
        fetchAccountSummary(firstAccountNo);
      } else {
        setAccounts([]); // Set empty accounts safely
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

  return (
    <div className="h-screen md:h-[80vh] bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] px-6 md:px-12 py-10 text-white flex flex-col lg:flex-row gap-10">
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

      {/* Right Section - Account Summary */}
      <div className="w-full lg:w-[360px] rounded-2xl p-6 bg-white/5 backdrop-blur border border-gray-700 shadow-xl space-y-6">
        <h2 className="text-lg font-semibold text-[var(--primary)] tracking-wide">
          Account Summary
        </h2>

        <div className="space-y-5">
          <div className="bg-[#0d1b2a] p-4 rounded-xl flex justify-between items-center">
            <div className="text-gray-400 text-sm">Total Deposited</div>
            <div className="text-white font-bold">${balance}</div>
          </div>
          <div className="flex justify-center">
            <Button
              text="Make a Deposit"
              onClick={() => setShowDepositModal(true)}
            />
          </div>

          {/* <div className="bg-[#0d1b2a] p-4 rounded-xl flex justify-between items-center">
            <div className="text-gray-400 text-sm">Total Withdrawn</div>
            <div className="text-white font-bold">${DWBalance}</div>
          </div> */}
          {/* <div className="flex justify-center">
            <Button text="Withdraw Funds" onClick={handleClick} />
          </div> */}
        </div>
      </div>
      <RegisterModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          fetchUserData(); // ✅ Refresh account list after modal closes
        }}
      />

      <AddBalanceModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        accountNo={Number(accountNo)}
        mode="deposit"
        onSuccess={() => {
          setShowDepositModal(false); // ✅ close modal first
          setTimeout(() => {
            fetchAccountSummary(Number(accountNo)); // ✅ refresh balance after short delay
          }, 100);
        }}
      />
    </div>
  );
}
