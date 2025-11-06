import { z } from "zod";
import { supabase } from "../../../lib/supabaseClient";

const schema = z.object({ title: z.string().min(1), userId: z.string() });

export async function addTask(data: { title: string; userId: string }) {
  const zres = schema.safeParse(data);
  if (!zres.success) throw new Error("Invalid input!");
  await supabase.from("tasks").insert({
    title: data.title,
    userid: data.userId,
  });
}

export async function toggleComplete(
  id: number,
  userId: string,
  iscompleted: boolean
) {
  await supabase
    .from("tasks")
    .update({ iscompleted: !iscompleted })
    .eq("id", id)
    .eq("userid", userId);
}

export async function deleteTask(id: number, userId: string) {
  await supabase.from("tasks").delete().eq("id", id).eq("userid", userId);
}

export async function updateTask(id: number, userId: string, title: string) {
  await supabase
    .from("tasks")
    .update({ title })
    .eq("id", id)
    .eq("userid", userId);
}
