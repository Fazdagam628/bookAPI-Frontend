// File: src/utils/api.js

const BASE_URL = import.meta.env.VITE_API_PATH;

export async function fetchBooks() {
  const res = await fetch(`${BASE_URL}`);
  return await res.json();
}

export async function fetchBookById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return await res.json();
}

export async function createBook(payload) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function updateBook(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  return await res.json();
}
