"use client";

import { useState } from "react";
import { TaskList } from "./TaskList"; // adjust import path if needed

// ✅ Define a type for the user object
type User = {
  id: string;
};

export default function DashboardPage({ user }: { user: User }) {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  return (
    <div className="p-6">
      <button
        onClick={() => setRefreshKey((k) => k + 1)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add Task
      </button>

      {/* ✅ Now fully type-safe and warning-free */}
      <TaskList userId={user.id} refreshKey={refreshKey} />
    </div>
  );
}
