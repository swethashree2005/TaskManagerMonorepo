"use client";
import { useRef, useState } from "react";
import { addTask } from "./serverActions";
import { z } from "zod";
import { motion } from "framer-motion";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "Task cannot be empty!" })
    .refine((val) => /\D/.test(val), {
      message: "Task cannot contain only numbers!",
    }),
});

export function TaskForm({ userId }: { userId: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = ref.current?.value || "";
    const validation = schema.safeParse({ title });
    if (!validation.success) {
      setError("Task cannot be empty!");
      return;
    }
    setError("");
    await addTask({ title, userId });
    ref.current!.value = "";
  };

  return (
    <motion.form
      onSubmit={handleAdd}
      className="flex py-4 gap-4 justify-center items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <input
        ref={ref}
        className="p-3 rounded border shadow bg-white text-lg text-black"
        placeholder="Add new task"
      />
      <button className="bg-gradient-to-r from-blue-400 to-purple-400 hover:scale-110 transition-transform px-5 py-2 rounded text-white shadow">
        Add
      </button>
      {error && (
        <span className="text-red-500 ml-3 animate-bounce">{error}</span>
      )}
    </motion.form>
  );
}
