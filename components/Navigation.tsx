"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useUser } from "@/lib/auth";
import { auth } from "@/lib/firebase";

export default function Navigation() {
  const router = useRouter();
  const user = useUser();

  async function handleLogout() {
    await signOut(auth);
    router.push("/");
  }

  if (!user) return null;
  return (
    <nav className="bg-gray-100 border-b mb-6 text-black">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="space-x-4">
          <Link href="/boekjes" className="font-medium hover:underline">
            Boekjes
          </Link>
          <Link href="/categories" className="font-medium hover:underline">
            Categorieën
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Uitloggen
        </button>
      </div>
    </nav>
  );
}
