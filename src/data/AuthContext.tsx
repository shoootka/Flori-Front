import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  password: string; // В реальном приложении не хранить пароль в plain text
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string, role: 'user' | 'admin') => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string, role: 'user' | 'admin'): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: User) => u.email === email)) {
      return false; // Email already exists
    }
    const newUser: User = {
      id: Date.now(),
      username,
      email,
      role,
      password,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}