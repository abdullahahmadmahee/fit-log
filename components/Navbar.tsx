"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "../app/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plannedWorkouts, savedWorkouts } = useWorkout();

  return (
    <nav className="flex items-center justify-between py-6 px-4 md:px-8 border-b border-surface">
      <Link href="/" className="text-2xl font-bold font-oswald tracking-wider flex items-center gap-2">
        <span>💪</span> FITLOG
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="/" className={`${pathname === "/" ? "text-accent" : "text-textSecondary hover:text-white transition-colors"}`}>
          Workouts
        </Link>
        <Link href="/my-plan" className={`${pathname === "/my-plan" ? "text-accent" : "text-textSecondary hover:text-white transition-colors"}`}>
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium">
        <Link href="/my-plan" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="hidden md:inline">Plan</span>
          <span className="bg-accent text-black px-2 py-0.5 rounded-full text-xs">
            {plannedWorkouts.length}
          </span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="hidden md:inline">Saved</span>
          <span className="border border-textSecondary text-textSecondary px-2 py-0.5 rounded-full text-xs">
            {savedWorkouts.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}