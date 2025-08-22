"use client";

export default function Stage1({ form, setForm, next }) {
  const isValid = form.nombre.trim() !== "";

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-gray-800">Información de la Marca</h2>
      <input
        type="text"
        placeholder="Marca a Registrar"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-800"
      />
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
  );
}
