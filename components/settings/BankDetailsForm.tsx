"use client";

import { useState } from "react";
import ProfileImage from "./ProfileImage";
import axios from "axios";

type BankDetailsFormFields = {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  iban: string;
  bankName: string;
  bankAddress: string;
};

type FieldConfig = {
  label: string;
  name: keyof BankDetailsFormFields;
  required: boolean;
  placeholder: string;
  description?: string;
};

export default function BankDetailsForm() {
  const [form, setForm] = useState<BankDetailsFormFields>({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    iban: "",
    bankName: "",
    bankAddress: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof BankDetailsFormFields)[] = [
      "accountHolderName",
      "accountNumber",
      "ifscCode",
      "bankName",
      "bankAddress",
    ];

    for (const field of requiredFields) {
      if (!form[field]) {
        alert("Please fill in all required fields.");
        return;
      }
    }

    const email = JSON.parse(localStorage.getItem("user") || "{}").email;
    if (!email) {
      alert("User email not found.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/bank/${email}`,
        form
      );
      alert("Bank details saved successfully!");
      setForm({
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        iban: "",
        bankName: "",
        bankAddress: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields: FieldConfig[] = [
    {
      label: "Account Holder Name",
      name: "accountHolderName",
      required: true,
      placeholder: "Enter account holder's name",
      description:
        "Enter your full legal name as it appears on your official identification.",
    },
    {
      label: "Account Number",
      name: "accountNumber",
      required: true,
      placeholder: "Enter account number",
    },
    {
      label: "IFSC/SWIFT Code",
      name: "ifscCode",
      required: true,
      placeholder: "Enter IFSC/SWIFT code",
    },
    {
      label: "IBAN",
      name: "iban",
      required: false,
      placeholder: "Enter IBAN",
    },
    {
      label: "Bank Name",
      name: "bankName",
      required: true,
      placeholder: "Enter bank name",
    },
    {
      label: "Bank Address",
      name: "bankAddress",
      required: true,
      placeholder: "Enter bank address",
    },
  ];

  return (
    <div className="space-y-6">
      <ProfileImage />

      <form
        className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-1 text-white">
          Add Bank Details
        </h2>
        <hr className="border-gray-700" />

        {fields.map((field) => (
          <div
            key={field.name}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
          >
            <div className="space-y-1 md:col-span-1">
              <label className="text-white font-medium">
                {field.label}
                <span className="ml-1 text-xs bg-gray-700 text-white px-2 py-0.5 rounded">
                  {field.required ? "Required" : "Optional"}
                </span>
              </label>
              {field.description && (
                <p className="text-gray-400 text-sm">{field.description}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-700 px-4 py-2 rounded-md text-white"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary)] cursor-pointer text-white px-6 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Bank Details"}
          </button>
        </div>
      </form>
    </div>
  );
}
