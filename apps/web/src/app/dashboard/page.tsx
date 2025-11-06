"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import type { User } from "@supabase/supabase-js";

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
  const [user, setUser] = useState<User | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        router.push("/");
        return;
      }

      if (!data?.user) {
        router.push("/");
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-rose-200 to-purple-200 relative">
      <SignOutButton />
      <h1 className="text-5xl font-bold text-center py-10 text-purple-700 animate-fade-in">
        Personal TODOs
      </h1>
      <TaskForm
        userId={user.id}
        onTaskAdded={() => setRefreshKey((k) => k + 1)}
      />
      <TaskList userId={user.id} refreshKey={refreshKey} />
    </div>
  );
}
