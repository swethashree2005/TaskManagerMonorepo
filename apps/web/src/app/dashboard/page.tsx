"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <button
      onClick={handleSignOut}
      className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Sign Out
    </button>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const sessionUser = supabase.auth.getUser();
    sessionUser.then(({ data }) => {
      if (!data.user) {
        router.push("/");
      } else {
        setUser(data.user);
      }
    });
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-rose-200 to-purple-200 relative">
      <SignOutButton />
      <h1 className="text-5xl font-bold text-center py-10 text-purple-700 animate-fade-in">
        Personal TODOs
      </h1>
      <TaskForm userId={user.id} />
      <TaskList userId={user.id} />
    </div>
  );
}
