"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-pink-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-xl flex flex-col gap-6 min-w-[320px]"
      >
        <h2 className="text-2xl font-bold text-purple-600 text-center mb-2">
          Sign In
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="text-black p-3 rounded bg-purple-50 border"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="text-[#000000] p-3 rounded bg-purple-50 border"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded font-bold hover:scale-105 transition-transform"
        >
          Login
        </button>
        {error && <div className="text-red-500 text-center mt-3">{error}</div>}
      </form>
    </div>
  );
}
