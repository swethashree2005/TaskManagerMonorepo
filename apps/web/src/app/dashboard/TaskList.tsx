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
    const { data } = await supabase
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
    <ul className="text-gray-700 space-y-4 animate-fade-in">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between px-4 py-3 rounded-xl shadow-lg bg-white/70 transition-all duration-300
            ${
              task.iscompleted
                ? "opacity-60 line-through bg-gradient-to-r from-gray-200 via-purple-100 to-blue-100"
                : "hover:scale-105 hover:shadow-blue-400"
            }
          `}
        >
          <span
            onClick={() => toggleComplete(task)}
            className="cursor-pointer text-lg font-medium hover:text-blue-600 transition duration-300"
          >
            {task.title}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:animate-bounce"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-pink-400 to-yellow-400 text-white hover:animate-pulse"
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
