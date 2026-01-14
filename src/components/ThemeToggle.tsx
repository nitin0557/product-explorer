"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      className="border px-3 py-1 rounded"
      onClick={() => setDark(!dark)}
    >
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
