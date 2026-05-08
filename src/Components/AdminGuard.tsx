import type { ReactNode } from 'react';
import { useAuth } from '../data/AuthContext';

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) return <div>Нужно войти (user = {String(user)})</div>;
  if (user.role.toLowerCase() !== 'admin') return <div>403 Forbidden</div>;

  return <>{children}</>;
}