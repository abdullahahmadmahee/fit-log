"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WorkoutCard from "../components/WorkoutCard";
import { Workout } from "./context/WorkoutContext";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="pb-16">
      <section className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24 gap-8">
        <div className="md:w-1/2 flex flex-col items-start gap-4">
          <span className="text-accent font-bold tracking-widest text-sm uppercase">Workout Library</span>
          <h1 className="text-5xl md:text-7xl font-bold font-oswald uppercase leading-tight">
            Train with intent.<br />Log every set.
          </h1>
          <p className="text-textSecondary text-lg max-w-md my-4">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <Link href="#library" className="bg-accent text-black font-bold px-8 py-3 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2">
            BROWSE WORKOUTS
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img src="/banner.png" alt="banner.png" className="max-w-full h-auto object-contain max-h-[500px]" />
        </div>
      </section>

      <section id="library" className="pt-12 scroll-mt-24">
        <div className="mb-10">
          <h2 className="text-3xl font-bold font-oswald uppercase mb-2">The Library</h2>
          <p className="text-textSecondary">Twelve lifts covering every major muscle group.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}