"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-100 text-gray-800 p-4 flex flex-col rounded-r-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Marcas</h1>
      <nav className="space-y-3">
        <Link
          href="/"
          className="block p-2 rounded hover:bg-blue-200 transition"
        >
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}
