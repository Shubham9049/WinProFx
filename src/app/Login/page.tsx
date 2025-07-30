// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Button from "../../../components/Button";
import Logo from "../../../assets/logo.webp";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // Handle sign-in logic
    alert("Signup Function  not initiated yet");

    console.log("Sign In:", { email, password });
  };

  const handleSignUpRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-0"
      >
        <source src="/signup.mp4" type="video/mp4" />
      </video>
      <div className="z-20 w-full max-w-md p-8 rounded-xl bg-black/30 backdrop-blur border border-white/10 text-white">
        <div className="text-center mb-6">
          <Link href={"/"}>
            <Image
              src={Logo}
              alt="WinproFX"
              width={100}
              height={40}
              className="mx-auto mb-2"
            />
          </Link>
          <h2 className="text-2xl font-semibold">
            {" "}
            <Link href={"/register"}></Link>
          </h2>
          <p className="text-sm mt-2 text-gray-400">
            Don&apos;t have an account?{" "}
            <span
              className="text-white font-semibold cursor-pointer"
              onClick={handleSignUpRedirect}
            >
              Sign Up
            </span>
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 text-white"
              placeholder="clientemail@winprofx.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password*</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 text-white"
                placeholder="**********"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" /> Remember me
            </label>
            <a href="#" className="hover:underline text-white">
              Forgot Password?
            </a>
          </div>

          <Button
            text="SIGN IN"
            onClick={handleSignIn}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-500 hover:opacity-90 text-white py-2 rounded-full"
          />
          <Button
            text="SIGN UP"
            onClick={handleSignUpRedirect}
            className="w-full border border-white text-white py-2 rounded-full hover:bg-white hover:text-black"
          />
        </form>
      </div>
    </div>
  );
}
