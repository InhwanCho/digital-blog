"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { GoSun, GoMoon } from "react-icons/go";



export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <Button variant="ghost" className="w-10 px-0" onClick={toggleTheme}>
      <GoSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <GoMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
