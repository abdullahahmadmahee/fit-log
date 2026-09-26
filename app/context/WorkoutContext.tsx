"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
  isDone?: boolean;
}

interface WorkoutContextType {
  plannedWorkouts: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: number, type: 'plan' | 'saved') => void;
  markAsDone: (id: number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [plannedWorkouts, setPlannedWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    if (storedPlan) setPlannedWorkouts(JSON.parse(storedPlan));
    if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plannedWorkouts));
    }
  }, [plannedWorkouts, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
    }
  }, [savedWorkouts, isMounted]);

  const addToPlan = (workout: Workout) => {
    if (plannedWorkouts.length >= 5) {
      return;
    }
    if (!plannedWorkouts.find(w => w.id === workout.id)) {
      setPlannedWorkouts([...plannedWorkouts, { ...workout, isDone: false }]);
    }
  };

  const saveForLater = (workout: Workout) => {
    if (!savedWorkouts.find(w => w.id === workout.id)) {
      setSavedWorkouts([...savedWorkouts, workout]);
    }
  };

  const removeFromPlan = (id: number, type: 'plan' | 'saved') => {
    if (type === 'plan') {
      setPlannedWorkouts(plannedWorkouts.filter(w => w.id !== id));
    } else {
      setSavedWorkouts(savedWorkouts.filter(w => w.id !== id));
    }
  };

  const markAsDone = (id: number) => {
    setPlannedWorkouts(plannedWorkouts.map(w =>
      w.id === id ? { ...w, isDone: true } : w
    ));
  };

  return (
    <WorkoutContext.Provider value={{ plannedWorkouts, savedWorkouts, addToPlan, saveForLater, removeFromPlan, markAsDone }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}