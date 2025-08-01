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
  const [error, setError] = useState("");
  const [step, setStep] = useState<"login" | "reset-request" | "reset-verify">(
    "login"
  );

  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setError("");
    setLoading(true); // ⬅️ Add loading start

    if (!email || !password) {
      setLoading(false); // ⬅️ Stop loading if validation fails
      return setError("Please fill in all fields.");
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      console.log(data.user);

      if (!res.ok) {
        setLoading(false); // ⬅️ Stop loading on error
        return setError(data.message || "Login failed.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // ⬅️ Always stop loading
    }
  };

  const requestPasswordReset = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/request-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Failed to send OTP");

      alert("OTP sent to email and WhatsApp");
      setStep("reset-verify");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const verifyAndResetPassword = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/verify-reset-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: resetOtp, newPassword }),
        }
      );

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Reset failed");

      alert("Password reset successful. Please login.");
      setStep("login");
      setPassword("");
      setNewPassword("");
      setResetOtp("");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpRedirect = () => router.push("/register");

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
            {step === "login"
              ? "Login"
              : step === "reset-request"
              ? "Reset Password"
              : "Verify OTP"}
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

        {step === "login" && (
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
                <input type="checkbox" className="accent-blue-500" /> Remember
                me
              </label>
              <span
                onClick={() => setStep("reset-request")}
                className="hover:underline text-white cursor-pointer"
              >
                Forgot Password?
              </span>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <Button
              text={
                loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  "SIGN IN"
                )
              }
              onClick={handleSignIn}
              disabled={loading}
              className={`w-full bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-2 rounded-full ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
              }`}
            />

            <Button
              text="SIGN UP"
              onClick={handleSignUpRedirect}
              className="w-full border border-white text-white py-2 rounded-full hover:bg-white hover:text-black"
            />
          </form>
        )}

        {step === "reset-request" && (
          <div className="space-y-4">
            <label className="block">Enter your email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 text-white"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <div className="text-red-400 text-sm">{error}</div>}

            <Button
              text={loading ? "Sending OTP..." : "Send OTP"}
              onClick={requestPasswordReset}
              className="w-full bg-blue-600 text-white py-2 rounded"
            />

            <p
              className="text-sm text-gray-400 text-center cursor-pointer hover:underline"
              onClick={() => setStep("login")}
            >
              Back to Login
            </p>
          </div>
        )}

        {step === "reset-verify" && (
          <div className="space-y-4">
            <label className="block">Enter OTP</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 text-white"
              placeholder="OTP"
              value={resetOtp}
              onChange={(e) => setResetOtp(e.target.value)}
            />

            <label className="block">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 text-white"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {error && <div className="text-red-400 text-sm">{error}</div>}

            <Button
              text={loading ? "Resetting..." : "Reset Password"}
              onClick={verifyAndResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded"
            />

            <p
              className="text-sm text-gray-400 text-center cursor-pointer hover:underline"
              onClick={() => setStep("login")}
            >
              Back to Login
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
