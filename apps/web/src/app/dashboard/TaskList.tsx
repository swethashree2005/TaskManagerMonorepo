"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

import { motion } from "framer-motion";

// ✅ Define Task type (matches your Supabase 'tasks' table)
type Task = {
  id: number;
  title: string;
  iscompleted: boolean;
  userid: string;
};

// ✅ Fix: add refreshKey to props
type TaskListProps = {
  userId: string;
  refreshKey?: number; // <-- added this line
};

export function TaskList({ userId, refreshKey }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("userid", userId);

      if (!error && data) setTasks(data);
    };

    fetchTasks();
  }, [userId, refreshKey]); // ✅ added refreshKey so it reloads when changed

  return (
    <div>
      {tasks.map((task) => (
        <motion.div key={task.id} className="p-2 border-b">
          <p>{task.title}</p>
        </motion.div>
      ))}
    </div>
  );
}
