"use client";

import { useState } from "react";
import { registerUser } from "../../api/authAPI";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const data = await registerUser({ email, password });
      toast.success(`${data.email} registrado!`);
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 3000);
    } catch (err) {
      if (err.message.includes("409") || err.message.includes("Correo ya registrado")) {
        toast.error("El correo ya está registrado");
      } else {
        toast.error("Error al registrar usuario");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Registro de Usuario
        </h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          style={{ textTransform: "lowercase" }}
          className="bg-white border border-gray-300 p-3 rounded-lg w-full mb-4 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white border border-gray-300 p-3 rounded-lg w-full mb-4 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="bg-white border border-gray-300 p-3 rounded-lg w-full mb-6 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-700 font-semibold transition">
          Registrar
        </button>

        <p className="text-sm text-black text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
