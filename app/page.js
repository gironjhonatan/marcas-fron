"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MarcaTable from "../app/components/MarcaTable";
import Sidebar from "../app/components/Sidebar";
import Header from "../app/components/Header";
import NuevoRegistro from "../app/registro/nuevo/page";

export default function Home() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [showNuevoRegistro, setShowNuevoRegistro] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  if (!authenticated) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header onNuevoRegistro={() => setShowNuevoRegistro(true)} />
        <main className="p-6">
          {showNuevoRegistro ? (
            <div>
              <button
                onClick={() => setShowNuevoRegistro(false)}
                className="mb-4 text-gray-500 hover:text-gray-700"
              >
                ← Volver al listado
              </button>
              <NuevoRegistro onCancel={() => setShowNuevoRegistro(false)} />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Listado de Marcas
              </h1>
              <MarcaTable />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
