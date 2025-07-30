// components/Topbar.tsx
"use client";

export default function Topbar() {
  return (
    <div className="h-16 w-full flex items-center justify-between px-6 bg-[#121e2c] text-white shadow z-40">
      {/* Left section - can include breadcrumbs or title */}
      <div className="text-lg font-semibold">Dashboard</div>

      {/* Right section - search, icons, profile */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          className="bg-[#1e2b3a] text-sm text-white px-3 py-1 rounded focus:outline-none"
        />

        {/* Notifications */}
        <button className="hover:text-gray-300">🔔</button>

        {/* Language (example icon) */}
        <button className="hover:text-gray-300">🌐</button>
      </div>
    </div>
  );
}
