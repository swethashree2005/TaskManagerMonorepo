"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { toggleComplete, deleteTask, updateTask } from "./serverActions";
import { motion } from "framer-motion";

export function TaskList({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    let ignore = false;
    async function fetchTasks() {
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .eq("userid", userId)
        .order("id", { ascending: false });
      if (!ignore) setTasks(data!);
    }
    fetchTasks();
    return () => {
      ignore = true;
    };
  }, [userId]);

  async function handleToggle(id: number, iscompleted: boolean) {
    await toggleComplete(id, userId, iscompleted);
    setTasks((tasks) =>
      tasks.map((t) =>
        t.id === id ? { ...t, iscompleted: !t.iscompleted } : t
      )
    );
  }
  async function handleDelete(id: number) {
    await deleteTask(id, userId);
    setTasks((tasks) => tasks.filter((t) => t.id !== id));
  }

  function startEditing(id: number, currentTitle: string) {
    setEditId(id);
    setEditTitle(currentTitle);
  }

  async function saveEdit(id: number) {
    await updateTask(id, userId, editTitle);
    setTasks((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, title: editTitle } : t))
    );
    setEditId(null);
    setEditTitle("");
  }

  function cancelEdit() {
    setEditId(null);
    setEditTitle("");
  }

  return (
    <motion.ul
      className="w-full max-w-xl mx-auto space-y-3 mt-6 text-black"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {tasks.map((task) => (
        <motion.li
          key={task.id}
          className={`flex items-center justify-between p-4 rounded shadow bg-white ${
            task.iscompleted ? "opacity-60 line-through" : ""
          }`}
          variants={{
            hidden: { x: -50, opacity: 0 },
            show: { x: 0, opacity: 1 },
          }}
        >
          {editId === task.id ? (
            <>
              <input
                className="flex-grow border rounded p-2 mr-4"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button
                className="bg-green-400 px-3 py-1 rounded text-white mr-2"
                onClick={() => saveEdit(task.id)}
              >
                Save
              </button>
              <button
                className="bg-gray-400 px-3 py-1 rounded text-white"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span
                className="text-lg flex-grow cursor-pointer"
                onDoubleClick={() => startEditing(task.id, task.title)}
              >
                {task.title}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggle(task.id, task.iscompleted)}
                  className={`rounded p-2 ${
                    task.iscompleted
                      ? "bg-green-400 hover:bg-green-600"
                      : "bg-yellow-300 hover:bg-yellow-500"
                  } transition-colors`}
                >
                  {task.iscompleted ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => startEditing(task.id, task.title)}
                  className="bg-blue-400 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-400 hover:bg-red-600 p-2 rounded text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
}
