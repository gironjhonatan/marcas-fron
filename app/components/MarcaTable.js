"use client";

import { CheckCircleIcon, XCircleIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { getMarcas, deleteMarca, updateMarca } from "../api/marcaAPI";
import { toast } from "react-hot-toast";

export default function MarcaTable() {
  const [marcas, setMarcas] = useState([]);
  const [editingMarca, setEditingMarca] = useState(null);
  const [form, setForm] = useState({ nombre: "", titular: "", estado: false });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchMarcas();
    }
  }, [token]);

  const fetchMarcas = async () => {
    try {
      const data = await getMarcas(token);
      setMarcas(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMarca(id, token);
      toast.success("Marca eliminada");
      fetchMarcas();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (marca) => {
    setEditingMarca(marca);
    setForm({
      nombre: marca.nombre,
      titular: marca.titular,
      estado: marca.estado,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateMarca(editingMarca.id, form, token);
      toast.success("Marca actualizada");
      setEditingMarca(null);
      fetchMarcas();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg mt-6 p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 font-medium text-gray-800">#</th>
            <th className="py-2 font-medium text-gray-800">Marca</th>
            <th className="py-2 font-medium text-gray-800">Titular</th>
            <th className="py-2 font-medium text-gray-800">Estado</th>
            <th className="py-2 font-medium text-gray-800">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((m, idx) => (
            <tr
              key={m.id}
              className="border-b border-gray-100 hover:bg-blue-50 transition"
            >
              <td className="py-2 text-gray-700">{idx + 1}</td>
              <td className="py-2 text-gray-700">{m.nombre}</td>
              <td className="py-2 text-gray-700">{m.titular}</td>
              <td className="py-2 text-gray-700">
                {m.estado ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500 inline" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-400 inline" />
                )}
              </td>
              <td className="flex space-x-2 py-2">
                <TrashIcon
                  className="h-5 w-5 text-red-400 cursor-pointer"
                  onClick={() => handleDelete(m.id)}
                />
                <PencilIcon
                  className="h-5 w-5 text-green-400 cursor-pointer"
                  onClick={() => handleEdit(m)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingMarca && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border">
            <h2 className="text-lg font-bold mb-4 text-black">Editar Marca</h2>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full p-2 border rounded mb-2 text-black"
              placeholder="Nombre"
            />
            <input
              type="text"
              value={form.titular}
              onChange={(e) => setForm({ ...form, titular: e.target.value })}
              className="w-full p-2 border rounded mb-2 text-black"
              placeholder="Titular"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.checked })}
                className="mr-2"
              />
              <label className="text-black">Activo</label>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setEditingMarca(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
