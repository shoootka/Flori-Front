import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

const API = 'https://localhost:7161/api';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, role: 'user' | 'admin') => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

 useEffect(() => {
  fetch(`${API}/Auth/me`, { credentials: 'include' })
    .then(r => r.json())
    .then(r => setUser(r?.data ?? null))
    .catch(() => setUser(null));
}, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API}/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }).then(r => r.json());

    if (!res.isSuccess) return false;

    const me = await fetch(`${API}/Auth/me`, { credentials: 'include' }).then(r => r.json());
    setUser(me?.data ?? null);
    return true;
  };

  const register = async (username: string, email: string, password: string, role: 'user' | 'admin') => {
    const res = await fetch(`${API}/Auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, email, password, role }),
    }).then(r => r.json());

    if (!res.isSuccess) return false;

    const me = await fetch(`${API}/Auth/me`, { credentials: 'include' }).then(r => r.json());
    setUser(me?.data ?? null);
    return true;
  };

  const logout = async () => {
    await fetch(`${API}/Auth/logout`, { method: 'POST', credentials: 'include' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

