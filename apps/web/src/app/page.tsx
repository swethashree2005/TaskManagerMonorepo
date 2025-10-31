"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 -z-10"
      >
        <motion.div
          className="absolute top-10 left-20 w-64 h-64 bg-purple-400 rounded-full opacity-60 blur-2xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-20 bottom-20 w-52 h-52 bg-pink-400 rounded-full opacity-50 blur-2xl"
          animate={{ x: [0, -30, 0], scale: [1, 1.07, 1], rotate: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.h1
        className="text-6xl font-extrabold text-white drop-shadow-lg mb-12 animate-pulse"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        TaskSpark
      </motion.h1>

      <motion.img
        src={"./img2.png"}
        alt="Task Manager Logo"
        className="w-68 h-68 object-contain"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="mt-12 flex gap-10">
        <button
          onClick={() => router.push("/sign-in")}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-110 transition-transform"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/sign-up")}
          className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-110 transition-transform"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
