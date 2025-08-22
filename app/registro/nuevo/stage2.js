"use client";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Stage2({ form, setForm, next, prev }) {
  const isValid = form.titular.trim() !== "" && form.estado !== undefined; 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Información del Titular</h2>
        {isValid && <CheckCircleIcon className="h-6 w-6 text-green-500 ml-2" />}
      </div>

      <input
        type="text"
        name="titular"
        placeholder="Titular de la Marca"
        value={form.titular}
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-800"
      />

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Estado de la Marca</label>
        <div className="flex items-center">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="estado"
              checked={form.estado || false}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-green-500 rounded focus:ring-green-400"
            />
            <span className="ml-2 text-gray-700">Activo</span>
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prev}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Atrás
        </button>
        <button
          onClick={next}
          disabled={!isValid}
          className={`px-4 py-2 rounded transition ${
            isValid
              ? "bg-blue-400 text-white hover:bg-blue-500"
              : "bg-blue-200 text-white cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
