"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import { Camera } from "lucide-react";
import ProfileImage from "./ProfileImage";

export default function ProfileForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  //   const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    accountType: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });

  //   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (!file) return;

  //     const formData = new FormData();
  //     formData.append("image", file);

  //     try {
  //       const res = await axios.post("/api/upload-profile-image", formData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });
  //       setProfileImage(res.data.imageUrl); // Assuming your API returns `imageUrl`
  //     } catch (err) {
  //       console.error("Image upload failed", err);
  //     }
  //   };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/update-profile", formData);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser.fullName || "U");
          setEmail(parsedUser.email);
        } catch (e) {
          setUserName("U");
        }
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Profile Image Box */}
      <ProfileImage />

      {/* Profile Info Form */}
      <form
        onSubmit={handleUpdate}
        className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-xl font-semibold mb-1">Profile Info</h2>
        <hr className="border-gray-700 mb-4" />

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="fullName"
            required
            onChange={handleInputChange}
            value={userName}
            className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 flex-wrap">
            {["Male", "Female", "Prefer Not to Say"].map((g) => (
              <label
                key={g}
                className={`px-4 py-2 border rounded-md text-sm cursor-pointer transition ${
                  formData.gender === g
                    ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                    : "bg-[#10151f] border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleInputChange}
                  className="hidden"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            onChange={handleInputChange}
            value={email}
            className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            onChange={handleInputChange}
            value={formData.phone}
            className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Account Type */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Account Type <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 flex-wrap">
            {["Individual", "Corporate"].map((type) => (
              <label
                key={type}
                className={`px-4 py-2 border rounded-md text-sm cursor-pointer transition ${
                  formData.accountType === type
                    ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                    : "bg-[#10151f] border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value={type}
                  checked={formData.accountType === type}
                  onChange={handleInputChange}
                  className="hidden"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            required
            onChange={handleInputChange}
            value={formData.address}
            className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
            rows={2}
          />
        </div>

        {/* Location Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["country", "state", "city"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field} <span className="text-red-500">*</span>
              </label>
              <input
                name={field}
                required
                onChange={handleInputChange}
                value={formData[field as keyof typeof formData]}
                className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
          ))}
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            name="postalCode"
            required
            onChange={handleInputChange}
            value={formData.postalCode}
            className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-[var(--primary)] hover:bg-opacity-80 transition text-white font-semibold px-6 py-2 rounded-md"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
