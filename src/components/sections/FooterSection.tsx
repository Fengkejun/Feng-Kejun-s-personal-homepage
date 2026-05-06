import { profile } from "@/data/profile";

export default function FooterSection() {
  return (
    <footer className="border-t border-neutral-800 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-white font-semibold">{profile.name}</p>
          <p className="text-neutral-500 text-sm">{profile.role}</p>
        </div>

        <div className="text-neutral-500 text-sm text-center">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>

        <div className="text-neutral-500 text-sm">
          Built with React + TypeScript + Aceternity UI
        </div>
      </div>
    </footer>
  );
}
