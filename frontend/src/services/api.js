const API_BASE = "/api/people";

export async function getPeople() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch people");
  return res.json();
}

export async function getPerson(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Person not found");
  return res.json();
}

export async function createPerson(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (!res.ok) throw { status: res.status, ...body };
  return body;
}

export async function updatePerson(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (!res.ok) throw { status: res.status, ...body };
  return body;
}

export async function deletePerson(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  const body = await res.json();
  if (!res.ok) throw { status: res.status, ...body };
  return body;
}
