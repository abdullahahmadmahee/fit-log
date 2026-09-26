"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkout } from "../context/WorkoutContext";

export default function MyPlan() {
  const { plannedWorkouts, savedWorkouts, removeFromPlan, markAsDone } = useWorkout();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [toastMessage, setToastMessage] = useState("");

  const currentList = activeTab === 'plan' ? plannedWorkouts : savedWorkouts;
  
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((sum, workout) => sum + workout.duration, 0);
  const totalCalories = currentList.reduce((sum, workout) => sum + workout.caloriesBurned, 0);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleRemove = (id: number) => {
    removeFromPlan(id, activeTab);
    showToast("Workout removed");
  };

  const handleMarkAsDone = (id: number) => {
    markAsDone(id);
    showToast("Marked as done!");
  };

  return (
    <div className="py-12 relative">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-oswald uppercase text-white mb-2">My Plan</h1>
        <p className="text-textSecondary">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 bg-surface border border-[#2a2a2a] rounded-xl p-6">
        <div>
          <p className="text-textSecondary text-sm font-bold mb-1">Exercises</p>
          <p className="text-3xl font-bold font-oswald text-accent">{totalExercises}</p>
        </div>
        <div>
          <p className="text-textSecondary text-sm font-bold mb-1">Minutes</p>
          <p className="text-3xl font-bold font-oswald text-white">{totalMinutes}</p>
        </div>
        <div>
          <p className="text-textSecondary text-sm font-bold mb-1">Calories</p>
          <p className="text-3xl font-bold font-oswald text-white">{totalCalories}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex bg-surface rounded-lg p-1 border border-[#2a2a2a]">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-colors ${
              activeTab === 'plan' ? 'bg-[#333] text-white' : 'text-textSecondary hover:text-white'
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-colors ${
              activeTab === 'saved' ? 'bg-[#333] text-white' : 'text-textSecondary hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>
      </div>

      {currentList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-[#2a2a2a] rounded-xl bg-surface/50">
          <h2 className="text-2xl font-bold font-oswald uppercase text-white mb-2">Nothing here yet</h2>
          <p className="text-textSecondary mb-6">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="bg-accent text-black font-bold px-6 py-3 rounded-md hover:opacity-90 transition-opacity">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {currentList.map((workout) => (
            <div key={workout.id} className="flex flex-col md:flex-row bg-surface border border-[#2a2a2a] rounded-xl overflow-hidden relative">
              <button 
                onClick={() => handleRemove(workout.id)}
                className="absolute top-4 right-4 text-textSecondary hover:text-white transition-colors"
                title="Remove"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className="w-full md:w-48 h-32 md:h-auto bg-black flex-shrink-0">
                <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-5 flex-grow flex flex-col justify-center pr-12">
                <h3 className="text-xl font-bold font-oswald text-white uppercase mb-1">{workout.name}</h3>
                <p className="text-sm text-textSecondary mb-3">{workout.equipment}</p>
                <div className="flex items-center gap-4 text-xs text-textSecondary font-medium">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {workout.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg>
                    {workout.caloriesBurned} kcal
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    {workout.rating}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-center gap-3 md:border-l border-[#2a2a2a] md:w-48">
                <Link 
                  href={`/workout/${workout.id}`}
                  className="w-full border border-textSecondary text-white text-sm font-bold py-2 px-4 rounded hover:bg-[#333] transition-colors text-center"
                >
                  View Details
                </Link>
                {activeTab === 'plan' && (
                  <button 
                    onClick={() => handleMarkAsDone(workout.id)}
                    className={`w-full text-sm font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 ${
                      workout.isDone 
                        ? 'bg-green-600 text-white' 
                        : 'bg-accent text-black hover:opacity-90'
                    }`}
                  >
                    {workout.isDone && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
                    {workout.isDone ? 'Done' : 'Mark as Done'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

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