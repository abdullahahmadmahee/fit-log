"use client";

import { useState, useEffect, use } from "react";
import { useWorkout, Workout } from "../../context/WorkoutContext";

export default function WorkoutDetails({ params }: { params: Promise<{ id: string }> }) {
  // 1. Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  
  const { addToPlan, saveForLater } = useWorkout();

  useEffect(() => {
    const fetchSingleWorkout = async () => {
      try {
        // 2. Use the unwrapped 'id' here
        const response = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await response.json();
        setWorkout(data);
      } catch (error) {
        console.error("Error fetching workout details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleWorkout();
  }, [id]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleAddPlan = () => {
    if (workout) {
      addToPlan(workout);
      showToast("Added to today's plan");
    }
  };

  const handleSaveLater = () => {
    if (workout) {
      saveForLater(workout);
      showToast("Saved for later");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!workout || !workout.name) {
    return (
      <div className="text-center py-32 text-2xl font-oswald text-textSecondary">
        Workout not found
      </div>
    );
  }

  return (
    <div className="py-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden bg-black border border-[#2a2a2a]">
          <img 
            src={workout.image} 
            alt={workout.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold font-oswald uppercase mb-4 text-white">
            {workout.name}
          </h1>
          
          <p className="text-textSecondary text-lg italic mb-6">
            {workout.description}
          </p>

          <div className="flex gap-2 mb-8 flex-wrap">
            {/* 3. Added optional chaining (?.) for safety */}
            {workout.muscleGroups?.map((group, index) => (
              <span key={index} className="bg-accent text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                {group}
              </span>
            ))}
          </div>

          <div className="bg-surface rounded-xl p-6 mb-8 border border-[#2a2a2a] flex flex-col gap-4 text-sm">
            <div className="flex justify-between border-b border-[#333] pb-3">
              <span className="text-textSecondary font-bold">EQUIPMENT</span>
              <span className="text-white font-medium">{workout.equipment}</span>
            </div>
            <div className="flex justify-between border-b border-[#333] pb-3">
              <span className="text-textSecondary font-bold">DIFFICULTY</span>
              <span className="text-white font-medium">{workout.difficulty}</span>
            </div>
            <div className="flex justify-between border-b border-[#333] pb-3">
              <span className="text-textSecondary font-bold">SETS</span>
              <span className="text-white font-medium">{workout.sets}</span>
            </div>
            <div className="flex justify-between border-b border-[#333] pb-3">
              <span className="text-textSecondary font-bold">REPS</span>
              <span className="text-white font-medium">{workout.reps}</span>
            </div>
            <div className="flex justify-between border-b border-[#333] pb-3">
              <span className="text-textSecondary font-bold">DURATION</span>
              <span className="text-white font-medium">{workout.duration} min</span>
            </div>
            <div className="flex justify-between border-b border-[#333] pb-3">
              <span className="text-textSecondary font-bold">CALORIES</span>
              <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-textSecondary font-bold">RATING</span>
              <span className="text-white font-medium">{workout.rating}</span>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold font-oswald uppercase mb-4 text-white">Instructions</h3>
            <ol className="list-decimal list-inside space-y-3 text-textSecondary text-sm md:text-base">
              {/* Added optional chaining (?.) for safety */}
              {workout.instructions?.map((step, index) => (
                <li key={index} className="pl-2">{step}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
              onClick={handleAddPlan}
              className="flex-1 bg-accent text-black font-bold py-4 px-6 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Add to today's plan
            </button>
            <button 
              onClick={handleSaveLater}
              className="flex-1 border border-textSecondary text-white font-bold py-4 px-6 rounded-md hover:bg-surface transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
              Save for later
            </button>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce">
          <div className="bg-accent text-black px-6 py-3 rounded-lg shadow-xl font-bold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}