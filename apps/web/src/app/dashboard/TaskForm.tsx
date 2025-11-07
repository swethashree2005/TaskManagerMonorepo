"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Task {
  id: number;
  title: string;
  iscompleted: boolean;
  userid: string;
  created_at: string;
}

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
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        className="flex-1 px-3 py-2 border rounded-md"
        placeholder="Enter new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        {initialTask ? "Update" : "Add"}
      </button>
      {initialTask && (
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
