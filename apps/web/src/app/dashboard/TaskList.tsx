"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { TaskItem } from "./TaskItem";

export function TaskList({
  userId,
  refreshKey,
}: {
  userId: string;
  refreshKey: number;
}) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("userid", userId)
      .order("id", { ascending: false });

    if (error) console.error("Error fetching tasks:", error.message);
    setTasks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  if (tasks.length === 0)
    return (
      <p className="text-center text-gray-500 italic">No tasks yet. Add one!</p>
    );

  return (
    <div className="max-w-lg mx-auto">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          userId={userId}
          refresh={fetchTasks}
        />
      ))}
    </div>
  );
}
