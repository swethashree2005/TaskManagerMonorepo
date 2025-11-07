"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Task } from "./page";

export default function TaskForm({
  initialTask,
  onSave,
  onCancel,
}: {
  initialTask?: Task | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initialTask ? initialTask.title : "");
  const supabase = createClientComponentClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    if (initialTask) {
      await supabase.from("tasks").update({ title }).eq("id", initialTask.id);
    } else {
      await supabase.from("tasks").insert({ title });
    }
    setTitle("");
    onSave();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" text-gray-600 flex gap-2 items-center animate-fade-in"
    >
      <input
        className="flex-1 px-3 py-2 border-2 border-purple-500 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Enter new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        autoFocus
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
      >
        {initialTask ? "Update" : "Add"}
      </button>
      {initialTask && (
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all duration-300"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
