export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between py-8 px-4 md:px-8 border-t border-surface mt-16 text-sm text-textSecondary bg-[#0a0a0a]">
      <div className="font-bold font-oswald tracking-wider text-white mb-4 md:mb-0 flex items-center gap-2">
        <span><img src="/logo.png" alt="logo.png"/></span> FITLOG
      </div>
      <div>
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </div>
    </footer>
  );
}