"use client";

import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar
        showSidebar={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="h-16 fixed top-0 left-0 lg:left-64 right-0 z-40 bg-[#121e2c] text-white">
          <Topbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        </header>

        <main className="mt-16 h-[calc(100vh-4rem)] overflow-y-auto p-6 bg-[#000000]">
          {children}
        </main>
      </div>
    </div>
  );
}
