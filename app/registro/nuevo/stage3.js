"use client";
import { toast } from "react-hot-toast";
import { createMarca } from "../../api/marcaAPI";

export default function Stage3({ form, setStep }) {
  const token = localStorage.getItem("token");

  const crearRegistro = async () => {
    try {
      await createMarca(form, token);
      toast.success("Registro creado correctamente!");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCancel = () => {
    setStep(1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-black">Resumen</h2>

      <div className="mb-2">
        <span className="font-semibold text-black">Nombre:</span>{" "}
        <span className="text-black">{form.nombre}</span>
      </div>

      <div className="mb-4">
        <span className="font-semibold text-black">Titular:</span>{" "}
        <span className="text-black">{form.titular}</span>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          onClick={crearRegistro}
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Crear
        </button>
      </div>
    </div>
  );
}
