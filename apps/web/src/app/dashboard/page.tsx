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
    <main className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
        My Task Dashboard
      </h1>
      <TaskForm
        initialTask={editingTask}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <div className="mt-8">
        <TaskList key={refreshFlag} onEdit={handleEdit} />
      </div>
    </main>
  );
}
