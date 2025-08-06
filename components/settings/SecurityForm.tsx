"use client";

import { useState } from "react";
import ProfileImage from "./ProfileImage";
import axios from "axios";

export default function SecurityForm() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (form.newPassword.length < 8 || !/\d/.test(form.newPassword)) {
      alert(
        "Password must be at least 8 characters long and include a number."
      );
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("https://dummyapi.io/change-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      alert("Password updated successfully!");
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert("Failed to update password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProfileImage />

      <form
        className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-1 text-white">Security</h2>
        <hr className="border-gray-700" />

        {/* Old Password */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="space-y-1 md:col-span-1">
            <label className="text-white font-medium">
              Old Password{" "}
              <span className="ml-1 text-xs bg-gray-700 text-white px-2 py-0.5 rounded">
                Required
              </span>
            </label>
            <p className="text-gray-400 text-sm">
              Enter your current password to verify your identity.
            </p>
          </div>
          <div className="md:col-span-2">
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter your old password"
              value={form.oldPassword}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-700 px-4 py-2 rounded-md text-white"
            />
          </div>
        </div>

        {/* New Password */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="space-y-1 md:col-span-1">
            <label className="text-white font-medium">
              New Password{" "}
              <span className="ml-1 text-xs bg-gray-700 text-white px-2 py-0.5 rounded">
                Required
              </span>
            </label>
            <p className="text-gray-400 text-sm">
              Create a new password for your account.
            </p>
          </div>
          <div className="md:col-span-2 space-y-2">
            <input
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-700 px-4 py-2 rounded-md text-white"
            />
            <div className="text-gray-400 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-blue-400">•</span> Passwords must be at
                least 8 characters long.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-blue-400">•</span> Include at least one
                numeric digit (0-9).
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="space-y-1 md:col-span-1">
            <label className="text-white font-medium">
              Confirm New Password{" "}
              <span className="ml-1 text-xs bg-gray-700 text-white px-2 py-0.5 rounded">
                Required
              </span>
            </label>
            <p className="text-gray-400 text-sm">
              Please re-enter the new password you’ve just chosen.
            </p>
          </div>
          <div className="md:col-span-2">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your new password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-700 px-4 py-2 rounded-md text-white"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary)] hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
