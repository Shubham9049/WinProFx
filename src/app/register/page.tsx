"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import Logo from "../../../assets/logo.webp";
import Button from "../../../components/Button";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const handleClick = () => {
    alert("Signup Function is not initiated yet");
  };
  const handelredirect = () => {
    router.push("/login");
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <Head>
        <title>Sign Up | WinproFX</title>
      </Head>

      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-auto min-w-full min-h-full max-w-none z-0 object-cover"
      >
        <source src="/signup.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Form Container */}
      <div className="relative z-10 bg-black opacity-85 max-w-3xl w-full mx-4 md:mx-auto rounded-xl p-8 md:p-12 text-white">
        <div className="flex flex-col items-center mb-6">
          <a href="/">
            {" "}
            <Image
              src={Logo}
              alt="WinproFX Logo"
              width={100}
              height={40}
              className="mb-4"
            />
          </a>
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <p className="text-sm mt-2">
            Already have an account?{" "}
            <span className="text-[#00CFFF] cursor-pointer">Sign In</span>
          </p>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name*" className="input" />
          <input type="email" placeholder="Email*" className="input" />
          <input type="tel" placeholder="Phone Number*" className="input" />
          <select className="input">
            <option value="">Select Country*</option>
            <option>India</option>
            <option>USA</option>
          </select>
          <select className="input">
            <option value="">Select State*</option>
            <option>Maharashtra</option>
            <option>California</option>
          </select>
          <select className="input">
            <option value="">Select City*</option>
            <option>Mumbai</option>
            <option>Los Angeles</option>
          </select>
          <input type="password" placeholder="Password*" className="input" />
          <input
            type="password"
            placeholder="Confirm Password*"
            className="input border-red-500"
          />
          <input
            type="text"
            placeholder="Referral Code (if any)"
            className="input md:col-span-2"
          />

          {/* Checkboxes and Policy */}
          <div className="md:col-span-2 flex items-start text-sm text-gray-300">
            <input type="checkbox" className="mr-2 mt-1" />
            <label>
              I agree to the WinproFX{" "}
              <span className="text-[#00CFFF] underline">Privacy Policy</span>,{" "}
              <span className="text-[#00CFFF] underline">
                Terms and Conditions
              </span>
              , and{" "}
              <span className="text-[#00CFFF] underline">Risk Disclosure</span>.
            </label>
          </div>

          {/* Buttons */}
          <Button
            text="SIGN UP"
            onClick={handleClick}
            className="md:col-span-2 bg-[#00CFFF] hover:bg-[#009FCF] text-black font-semibold py-3 rounded-full"
          />

          <Button
            text="BACK TO LOGIN"
            onClick={handelredirect}
            className="md:col-span-2 border border-white text-white py-2 rounded-full hover:bg-white hover:text-black transition"
          />
        </form>
      </div>

      <style jsx>{`
        .input {
          background-color: #0f172a;
          border-radius: 0.5rem;
          padding: 0.75rem;
          color: white;
          border: 1px solid #1e293b;
        }
        .input:focus {
          outline: none;
          border-color: #00cfff;
        }
      `}</style>
    </div>
  );
}
