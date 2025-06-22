import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
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

export function getUser() : User | null {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return user;
  } else {
    return null;
  }
}