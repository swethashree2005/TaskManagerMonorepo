"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { toggleComplete, deleteTask, updateTask } from "./serverActions";
import { motion } from "framer-motion";

interface Task {
  id: number;
  title: string;
  userid: string;
  iscompleted: boolean;
}

export function TaskList({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // ✅ Fetch tasks when userId changes or after reload
  useEffect(() => {
    async function fetchTasks() {
      console.log("Fetching tasks for:", userId);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("userid", userId)
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      } else {
        console.log("Fetched data:", data);
        setTasks(data || []);
      }
      setLoading(false);
    }

    if (userId) fetchTasks();
  }, [userId]);

  // ✅ Toggle complete
  async function handleToggle(id: number, iscompleted: boolean) {
    await toggleComplete(id, userId, iscompleted);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, iscompleted: !iscompleted } : t))
    );
  }

  // ✅ Delete task
  async function handleDelete(id: number) {
    await deleteTask(id, userId);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // ✅ Edit / Save task
  async function handleSave(id: number) {
    if (!editText.trim()) return;
    await updateTask(id, userId, editText);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: editText } : t))
    );
    setEditingId(null);
    setEditText("");
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet. Add one!</p>;
  }

  return (
    <motion.div
      className="flex flex-col gap-3 w-full max-w-lg mx-auto mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          className={`flex justify-between items-center p-3 rounded-xl shadow-md ${
            task.iscompleted ? "bg-green-100" : "bg-white"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          {editingId === task.id ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 p-2 border rounded text-black"
              autoFocus
            />
          ) : (
            <p
              onClick={() => handleToggle(task.id, task.iscompleted)}
              className={`flex-1 cursor-pointer ${
                task.iscompleted ? "line-through text-gray-500" : "text-black"
              }`}
            >
              {task.title}
            </p>
          )}

          <div className="flex gap-2">
            {editingId === task.id ? (
              <button
                onClick={() => handleSave(task.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingId(task.id);
                  setEditText(task.title);
                }}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
