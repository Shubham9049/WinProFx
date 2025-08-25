"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { CreditCard, X } from "lucide-react";
import Button from "../../../../components/Button"; // ✅ import your Button

interface Account {
  _id: string;
  accountNo: number;
  currency: string;
}

function Deposit() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [form, setForm] = useState({
    accountno: "",
    amount: "",
  });

  // ✅ Fetch accounts from backend
  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      if (!token || !userString) return;

      const user = JSON.parse(userString);
      const email = user.email;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/user/${email}`
      );

      if (res.data?.accounts?.length > 0) {
        setAccounts(res.data.accounts);
        // Auto-select first account
        setForm((prev) => ({
          ...prev,
          accountno: res.data.accounts[0].accountNo.toString(),
        }));
      }
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/payment/deposit`,
        {
          amount: Number(form.amount),
          merchant_user_id: form.accountno, // ✅ selected account
        }
      );

      if (res.data?.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        alert("Deposit request sent!");
      }
    } catch (err) {
      console.error(err);
      alert("Deposit failed. Try again.");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="h-screen md:h-[80vh] bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] px-6 md:px-12 py-10 text-white">
      <h1 className="text-2xl font-bold mb-8">Payment Methods</h1>

      {/* DigiPay Box */}
      <div className="max-w-md border border-gray-700 bg-[#111827] rounded-2xl shadow-lg p-6 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <CreditCard size={40} className="text-[var(--primary-color)]" />
          <h2 className="text-xl font-semibold">DigiPay</h2>
        </div>
        <p className="text-gray-300 text-sm">
          Secure and fast deposit using DigiPay. Click below to proceed.
        </p>

        {/* ✅ Use Button instead of <button> */}
        <Button
          text="Deposit"
          onClick={() => setShowModal(true)}
          className="w-fit"
        />
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#1f2937] p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">Deposit with DigiPay</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dropdown for Accounts */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Select Account
                </label>
                <select
                  name="accountno"
                  value={form.accountno}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                >
                  {accounts.length > 0 ? (
                    accounts.map((acc) => (
                      <option key={acc._id} value={acc.accountNo}>
                        MT{acc.accountNo} ({acc.currency})
                      </option>
                    ))
                  ) : (
                    <option value="">No accounts available</option>
                  )}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>

              {/* ✅ Use Button instead of <button> */}
              <Button
                text={loading ? "Processing..." : "Confirm Deposit"}
                className="w-fit disabled:opacity-50"
                disabled={loading}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Deposit;
