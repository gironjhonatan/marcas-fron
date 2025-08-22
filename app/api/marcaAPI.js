const API_URL = "http://159.89.157.13:8000/";

export async function getMarcas(token) {
  const res = await fetch(`${API_URL}/marcas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener marcas");
  return res.json();
}

export async function createMarca(data, token) {
  const res = await fetch(`${API_URL}/marcas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear marca");
  return res.json();
}

export async function updateMarca(id, data, token) {
  const res = await fetch(`${API_URL}/marcas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar marca");
  return res.json();
}

export async function deleteMarca(id, token) {
  const res = await fetch(`${API_URL}/marcas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al eliminar marca");
  return res.json();
}
