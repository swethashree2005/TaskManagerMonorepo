"use client";

import { useState } from "react";
import { addTask } from "./serverActions";

export function TaskForm({
  userId,
  onTaskAdded,
}: {
  userId: string;
  onTaskAdded: () => void;
}) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await addTask({ title, userId });
      setTitle("");
      onTaskAdded();
    } catch (err) {
      console.error("Add task failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAdd} className="flex justify-center mt-8 mb-10 gap-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="text-black border-2 border-purple-400 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
