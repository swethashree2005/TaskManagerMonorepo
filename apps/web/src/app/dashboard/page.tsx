"use client";
import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

interface Task {
  id: number;
  title: string;
  iscompleted: boolean;
  userid: string;
  created_at: string;
}

export default function DashboardPage() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  function handleEdit(task: Task) {
    setEditingTask(task);
  }
  function handleSave() {
    setEditingTask(null);
    setRefreshFlag((f) => f + 1);
  }
  function handleCancel() {
    setEditingTask(null);
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-pink-200 via-blue-300 to-yellow-100 py-12 px-6 overflow-hidden">
      {/* Bubbles */}
      <div className="absolute top-20 left-10 w-10 h-10 bg-blue-400 rounded-full animate-ping opacity-40" />
      <div className="absolute top-80 left-40 w-10 h-10 bg-blue-400 rounded-full animate-ping opacity-40" />
      <div className="absolute top-140 left-70 w-10 h-10 bg-blue-400 rounded-full animate-ping opacity-40" />
      <div className="absolute top-30 left-150 w-10 h-10 bg-blue-400 rounded-full animate-ping opacity-40" />
      <div className="absolute top-100 left-170 w-10 h-10 bg-blue-400 rounded-full animate-ping opacity-40" />
      <div className="absolute top-130 left-230 w-10 h-10 bg-blue-400 rounded-full animate-ping opacity-40" />
      <div className="absolute top-80 left-270 w-10 h-10 bg-blue-400 rounded-full animate-ping opacity-40" />
      <div className="absolute top-30 left-300 w-10 h-10 bg-blue-400 rounded-full animate-ping opacity-40" />

      <h1 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 animate-pulse">
        My Tasks In Progress
      </h1>
      <div className="max-w-xl mx-auto p-4 relative z-10">
        <TaskForm
          initialTask={editingTask}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        <div className="mt-8">
          <TaskList key={refreshFlag} onEdit={handleEdit} />
        </div>
      </div>
    </main>
  );
}
