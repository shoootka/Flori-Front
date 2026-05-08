const API = 'https://localhost:7161/api';

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/Auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function apiGet(path: string) {
  const res = await fetch(`${API}${path}`, { credentials: 'include' });
  return res.json();
}

export async function apiPost(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function apiPut(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function apiDelete(path: string) {
  const res = await fetch(`${API}${path}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
}