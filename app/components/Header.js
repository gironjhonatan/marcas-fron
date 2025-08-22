"use client";

import { useRouter } from "next/navigation";

export default function Header({ onNuevoRegistro }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center rounded-b-lg">
      <h2 className="text-xl font-semibold text-gray-700">Registro de Marca</h2>
      <div className="flex space-x-2">
        <button
          onClick={onNuevoRegistro}
          className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          Nuevo Registro
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
