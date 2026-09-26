import Link from "next/link";
import { Workout } from "../app/context/WorkoutContext";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="bg-surface rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex flex-col cursor-pointer border border-[#2a2a2a]">
      <div className="h-48 w-full overflow-hidden bg-black">
        <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex gap-2 mb-3 flex-wrap">
          {workout.muscleGroups.map((group, index) => (
            <span key={index} className="bg-accent text-black px-2 py-1 rounded-md text-xs font-bold uppercase">
              {group}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold font-oswald text-white uppercase mb-1">{workout.name}</h3>
        <p className="text-sm text-textSecondary mb-4 flex-grow">{workout.equipment}</p>
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
    </Link>
  );
}