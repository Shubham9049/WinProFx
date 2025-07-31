// app/(dashboard)/deposits/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function DepositsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login"); // Redirect if not logged in
    }
  }, []);
  return <div className="text-white">This is the Dashboard Page</div>;
}
