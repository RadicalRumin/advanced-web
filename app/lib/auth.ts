import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect, useState } from 'react';

export function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return user;
}