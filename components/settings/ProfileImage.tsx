"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Camera } from "lucide-react";

function ProfileImage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!email) {
      console.error("User email is not set.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/profile-image/${email}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data?.user?.profileImage) {
        setProfileImage(res.data.user.profileImage);

        // Optional: also update localStorage
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = {
          ...storedUser,
          profileImage: res.data.user.profileImage,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (err: any) {
      console.error("Image upload failed", err.response?.data || err.message);
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
          setProfileImage(parsedUser.profileImage || null); // ✅ Load existing profile image
        } catch (e) {
          setUserName("U");
        }
      }
    }
  }, []);

  return (
    <div className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl flex flex-col items-center text-center shadow-lg">
      <div className="relative group w-32 h-32">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-[#222]"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-[#2c3e50] flex items-center justify-center text-white text-4xl font-bold border-4 border-[#222]">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
        <label className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <Camera className="text-white" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
      <p className="mt-2 text-sm text-gray-400">Click to change photo</p>
    </div>
  );
}

export default ProfileImage;
