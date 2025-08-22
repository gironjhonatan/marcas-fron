"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Wizard from "./wizard";

export default function NuevoRegistro({ onCancel }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

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
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crear Registro</h1>
      <Wizard onCancel={onCancel} />
    </div>
  );
}
