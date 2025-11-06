"use server";

import { z } from "zod";
import { supabase } from "../../../lib/supabaseClient";

const taskSchema = z.object({
  title: z.string().min(1, "Task title required"),
  userId: z.string().min(1, "User ID required"),
});

export async function addTask({
  title,
  userId,
}: {
  title: string;
  userId: string;
}) {
  const validated = taskSchema.safeParse({ title, userId });
  if (!validated.success) throw new Error("Invalid task input");

  const { error } = await supabase
    .from("tasks")
    .insert({ title, userid: userId, iscompleted: false });

  if (error) throw new Error(error.message);
}

export async function toggleTask(
  id: number,
  userId: string,
  iscompleted: boolean
) {
  const { error } = await supabase
    .from("tasks")
    .update({ iscompleted: !iscompleted })
    .eq("id", id)
    .eq("userid", userId);

  if (error) throw new Error(error.message);
}

export async function deleteTask(id: number, userId: string) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .eq("userid", userId);
  if (error) throw new Error(error.message);
}

export async function updateTask(id: number, userId: string, newTitle: string) {
  const { error } = await supabase
    .from("tasks")
    .update({ title: newTitle })
    .eq("id", id)
    .eq("userid", userId);
  if (error) throw new Error(error.message);
}
