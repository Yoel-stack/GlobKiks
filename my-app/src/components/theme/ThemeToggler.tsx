"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export default function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const active = theme === "system" ? systemTheme : theme;

  return (
    <button
      aria-label="Cambiar tema"
      onClick={() => setTheme(active === "dark" ? "light" : "dark")}
      className="py-2 px-3  rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-800 transition"
    >
      {active === "dark" ? " Claro" : " Oscuro"}
    </button>
  );
};
