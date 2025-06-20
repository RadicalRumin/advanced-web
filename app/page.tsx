'use client';
import { useUser } from "../lib/auth";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useState } from 'react';

export default function HomePage() {
  const user = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mijn Huishoudboekjes</h1>
      {!user ? (
        <div className="space-y-2">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full" />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Wachtwoord" type="password" className="border p-2 w-full" />
          <button onClick={login} className="bg-blue-600 text-white p-2 w-full">Inloggen</button>
        </div>
      ) : (
        <div>
          <p>Welkom, {user.email}</p>
          <button onClick={() => signOut(auth)} className="bg-red-500 text-white p-2">Uitloggen</button>
        </div>
      )}
    </div>
  );
}
