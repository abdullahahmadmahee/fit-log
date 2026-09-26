import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold font-oswald text-accent mb-4">404</h1>
      <h2 className="text-3xl font-bold font-oswald text-white uppercase mb-4">Page Not Found</h2>
      <p className="text-textSecondary mb-8 max-w-md">
        The lift you are looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link href="/" className="bg-accent text-black font-bold px-8 py-3 rounded-md hover:opacity-90 transition-opacity">
        BACK TO WORKOUTS
      </Link>
    </div>
  );
}