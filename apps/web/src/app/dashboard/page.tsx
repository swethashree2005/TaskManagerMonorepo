"use client";

import { useState } from "react";
import { TaskList } from "./TaskList"; // adjust import path if different

export default function DashboardPage({ user }: { user: any }) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-6">
      {/* Example add task button or input */}
      <button
        onClick={() => setRefreshKey((k) => k + 1)} // ✅ increments refreshKey to refresh task list
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add Task
      </button>

      {/* ✅ FIXED: refreshKey is now valid because we added it in TaskList props */}
      <TaskList userId={user.id} refreshKey={refreshKey} />
    </div>
  );
}
