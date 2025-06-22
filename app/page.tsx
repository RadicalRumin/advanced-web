'use client';
import { useUser } from '@/lib/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const user = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {!user ? (
        <div className="space-y-2">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full" />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Wachtwoord" type="password" className="border p-2 w-full" />
          <button onClick={login} className="bg-blue-600 text-white p-2 w-full">Inloggen</button>
        </div>
      ) : (
        <div className="space-y-2">
          <p>Welkom, {user.email}</p>
          <button onClick={logout} className="bg-red-500 text-white p-2">Uitloggen</button>
          <button onClick={() => router.push('/boekjes')} className="bg-blue-800 p-2">Ga naar overzicht</button>
        </div>
      )}
    </div>
  );
}
