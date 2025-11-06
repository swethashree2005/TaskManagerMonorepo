"use client";

import { useState } from "react";
import { toggleTask, deleteTask, updateTask } from "./serverActions";

export function TaskItem({
  task,
  userId,
  refresh,
}: {
  task: any;
  userId: string;
  refresh: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggle = async () => {
    await toggleTask(task.id, userId, task.iscompleted);
    refresh();
  };

  const handleDelete = async () => {
    await deleteTask(task.id, userId);
    refresh();
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    await updateTask(task.id, userId, editTitle);
    setIsEditing(false);
    refresh();
  };

  return (
    <div
      className={`flex justify-between items-center bg-white rounded-xl shadow-md p-4 mb-3 border-l-4 ${
        task.iscompleted ? "border-green-500" : "border-purple-500"
      }`}
    >
      {isEditing ? (
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          className="border border-gray-300 rounded px-2 py-1 flex-1 mr-3"
          autoFocus
        />
      ) : (
        <span
          onClick={handleToggle}
          className={`cursor-pointer flex-1 ${
            task.iscompleted ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </span>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-700"
        >
          ✏️
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
