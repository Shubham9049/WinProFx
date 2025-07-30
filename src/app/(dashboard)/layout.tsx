// app/(dashboard)/dashboard-layout/layout.tsx
"use client";

import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-0 bottom-0 z-50 bg-[#0b121a] text-white">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col ml-64">
        {/* Topbar */}
        <header className="h-16 fixed top-0 left-64 right-0 z-40  bg-[#121e2c] text-white">
          <Topbar />
        </header>

        {/* Main Content */}
        <main className="mt-16 h-[calc(100vh-4rem)] overflow-y-auto p-6 bg-[#000000]">
          {children}
        </main>
      </div>
    </div>
  );
}
