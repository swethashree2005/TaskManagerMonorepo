"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Task {
  id: number;
  title: string;
  iscompleted: boolean;
  userid: string;
  created_at: string;
}

export default function TaskList({ onEdit }: { onEdit: (task: Task) => void }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const supabase = createClientComponentClient();

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setTasks(data);
  }

  async function deleteTask(id: number) {
    await supabase.from("tasks").delete().eq("id", id);
    fetchTasks();
  }

  async function toggleComplete(task: Task) {
    await supabase
      .from("tasks")
      .update({ iscompleted: !task.iscompleted })
      .eq("id", task.id);
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ul className="text-gray-700 space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between px-4 py-2 rounded-md shadow bg-white ${
            task.iscompleted ? "opacity-70 line-through" : ""
          }`}
        >
          <span onClick={() => toggleComplete(task)} className="cursor-pointer">
            {task.title}
          </span>
          <div className="flex gap-2">
            <button
              className="px-2 py-1 rounded bg-blue-400 text-white"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 rounded bg-red-400 text-white"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
