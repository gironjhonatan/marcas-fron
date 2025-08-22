"use client";

import { useState } from "react";
import { loginUser } from "../../api/authAPI";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.access_token);
      toast.success("Login exitoso!");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      if (err.message.includes("401") || err.message.includes("not found")) {
        toast.error("Usuario no registrado");
      } else if (err.message.includes("incorrect")) {
        toast.error("Contraseña incorrecta");
      } else {
        toast.error("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="flex justify-center items-start bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Iniciar Sesión
        </h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-700 font-semibold transition">
          Entrar
        </button>

        <p className="text-sm text-black text-center mt-4">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}
