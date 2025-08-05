"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Wallet } from "lucide-react";
import emptyIcon from "../../../../assets/icons/empty_state.png";
import Button from "../../../../components/Button";
import RegisterModal from "../../../../components/CreateAccount";
import UpdatePasswordModal from "../../../../components/UpdatePasswordModal";
import { useRouter } from "next/navigation";
import AddBalanceModal from "../../../../components/AddBalanceModal";

interface Account {
  _id: string;
  accountNo: number;
  currency: string;
}

interface AccountSummary {
  balance: string;
  Credit: string;
  Floating: string;
  Margin: string;
  MarginFree: string;
  Equity: string;
  DWBalance: string;
}

export default function LiveAccounts() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [summary, setSummary] = useState<AccountSummary | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [balanceMode, setBalanceMode] = useState<"deposit" | "withdraw">(
    "deposit"
  );

  const router = useRouter();
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

      if (Array.isArray(userData.accounts) && userData.accounts.length > 0) {
        setAccounts(userData.accounts);
        setSelectedAccount(userData.accounts[0]);
        fetchAccountSummary(userData.accounts[0].accountNo);
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
        { accountno: accountNo.toString() },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.data?.response === "success") {
        const data = res.data.data;
        setSummary({
          balance: data.balance || "0",
          Credit: data.Credit || "0",
          Floating: data.Floating || "0",
          Margin: data.Margin || "0",
          MarginFree: data.MarginFree || "0",
          Equity: data.Equity || "0",
          DWBalance: data.DWBalance || "0",
        });
      } else {
        setSummary(null);
      }
    } catch (error) {
      console.error("Error fetching account summary:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!isLoggedIn) return null;

  return (
    <div className="h-screen md:h-[80vh] rounded-2xl flex flex-col lg:flex-row gap-6 px-6 py-10 bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] text-white">
      {/* Left - Account Numbers */}
      <div className="w-full lg:w-[300px] h-fit bg-[#121a2a] border border-gray-800 rounded-2xl p-6 shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-[var(--primary)] mb-2">
          Live MT5 Accounts
        </h2>

        {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center  text-center h-fit">
            <Image
              src={emptyIcon}
              alt="No Live Accounts"
              width={120}
              height={120}
              className="mb-4 grayscale opacity-80"
            />
            <p className="text-gray-400 text-sm mb-2">No live accounts yet.</p>
            <Button
              text="+ Create Account"
              onClick={() => setShowModal(true)}
            />
          </div>
        ) : (
          <>
            {accounts.map((acc) => (
              <div
                key={acc._id}
                onClick={() => {
                  setSelectedAccount(acc);
                  fetchAccountSummary(acc.accountNo);
                }}
                className={`cursor-pointer px-4 py-3 rounded-md border border-gray-700  transition ${
                  selectedAccount?.accountNo === acc.accountNo
                    ? " text-white font-semibold border border-[var(--primary)]"
                    : "bg-[#0d1b2a] "
                }`}
              >
                MT{acc.accountNo}
              </div>
            ))}
            {accounts.length === 0 && (
              <Button
                text="+ Create Account"
                onClick={() => setShowModal(true)}
              />
            )}
          </>
        )}
      </div>

      {/* Right - Summary */}
      <div className="flex-1 bg-[#121a2a] border border-gray-800 rounded-2xl p-8 shadow-xl space-y-6 h-fit">
        {selectedAccount && summary ? (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Account MT{selectedAccount.accountNo}
              </h2>
              <span className="bg-[var(--primary)]/20 text-[var(--primary)] px-4 py-1 rounded-full text-sm">
                {selectedAccount.currency}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-gray-400">💼 Balance</p>
                <p className="bg-[#17263e] px-3 py-2 rounded-md">
                  ${summary.balance}
                </p>
              </div>
              <div>
                <p className="text-gray-400">🏦 Credit</p>
                <p className="bg-[#17263e] px-3 py-2 rounded-md">
                  ${summary.Credit}
                </p>
              </div>
              <div>
                <p className="text-gray-400">📉 Floating</p>
                <p className="bg-[#17263e] px-3 py-2 rounded-md">
                  ${summary.Floating}
                </p>
              </div>
              <div>
                <p className="text-gray-400">📊 Margin</p>
                <p className="bg-[#17263e] px-3 py-2 rounded-md">
                  ${summary.Margin}
                </p>
              </div>
              <div>
                <p className="text-gray-400">💰 Free Margin</p>
                <p className="bg-[#17263e] px-3 py-2 rounded-md">
                  ${summary.MarginFree}
                </p>
              </div>
              <div>
                <p className="text-gray-400">📈 Equity</p>
                <p className="bg-[#17263e] px-3 py-2 rounded-md">
                  ${summary.Equity}
                </p>
              </div>
              <div className="col-span-2 md:col-span-3">
                <p className="text-gray-400">💵 DW Balance</p>
                <p className="bg-[#17263e] px-3 py-2 rounded-md">
                  ${summary.DWBalance}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                className="bg-blue-600 px-4 py-2 rounded-md text-sm cursor-pointer"
                onClick={() => router.push("/web-trader")}
              >
                Trade Now
              </button>
              <button
                className="bg-green-600 px-4 py-2 rounded-md text-sm cursor-pointer"
                onClick={() => {
                  setBalanceMode("deposit");
                  setShowAddBalanceModal(true);
                }}
              >
                Deposit
              </button>
              <button
                className="bg-red-600 px-4 py-2 rounded-md text-sm cursor-pointer"
                onClick={() => {
                  setBalanceMode("withdraw");
                  setShowAddBalanceModal(true);
                }}
              >
                Withdraw
              </button>
              <button
                className="bg-gray-600 px-4 py-2 rounded-md text-sm cursor-pointer"
                onClick={() => setShowPasswordModal(true)}
              >
                Update Password
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-400">
            Select an account to view its details.
          </p>
        )}
      </div>

      {/* Modal */}
      <RegisterModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          fetchUserData();
        }}
      />
      {selectedAccount && (
        <UpdatePasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          accountNo={selectedAccount.accountNo}
        />
      )}

      <AddBalanceModal
        isOpen={showAddBalanceModal}
        onClose={() => setShowAddBalanceModal(false)}
        accountNo={selectedAccount?.accountNo || 0}
        mode={balanceMode}
        onSuccess={() => {
          const accNo = selectedAccount?.accountNo;
          setShowAddBalanceModal(false); // ✅ Close modal immediately
          if (accNo) {
            setTimeout(() => {
              fetchAccountSummary(accNo); // ✅ Allow time for modal to close before fetching
              fetchUserData();
            }, 100);
          }
        }}
      />
    </div>
  );
}
