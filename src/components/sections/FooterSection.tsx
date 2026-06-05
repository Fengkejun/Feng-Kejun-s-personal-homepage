import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/data/profile";

const MOTTOS = [
  "Talk is cheap. Show me the code.",
  "Any fool can write code that a computer can understand.",
  "First, solve the problem. Then, write the code.",
  "Code is like humor. When you have to explain it, it's bad.",
  "Simplicity is the soul of efficiency.",
  "Make it work, make it right, make it fast.",
  "Programs must be written for people to read.",
  "The best error message is the one that never shows up.",
  "Debugging is twice as hard as writing code.",
  "It's not a bug, it's an undocumented feature.",
  "Deleted code is debugged code.",
  "Fix the cause, not the symptom.",
  "Optimism is an occupational hazard of programming.",
  "Testing leads to failure, and failure leads to understanding.",
  "The only way to go fast is to go well.",
  "Clean code always looks like it was written by someone who cares.",
  "Less is more. Keep it simple, stupid.",
  "Write it. Ship it. Iterate.",
  "Code never lies, comments sometimes do.",
  "Premature optimization is the root of all evil.",
  "一面学习，一面总结，一面生产。",
];

export default function FooterSection() {
  const [motto, setMotto] = useState("");
  const mottoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const picked = MOTTOS[Math.floor(Math.random() * MOTTOS.length)];
    setMotto(picked);
  }, []);

  useEffect(() => {
    if (!motto || !mottoRef.current) return;
    gsap.fromTo(
      mottoRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
    );
  }, [motto]);

  return (
    <footer className="relative py-12 px-4 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        {/* Divider glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />

        {/* Name */}
        <span
          className="text-lg text-white/80 tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome to Mr. Feng KeJun's homepage
        </span>

        {/* Random motto */}
        <span
          ref={mottoRef}
          className="text-white/30 text-xs text-center max-w-md italic"
          style={{ opacity: 0 }}
        >
          "{motto}"
        </span>

        {/* Copyright */}
        <div className="text-white/40 text-xs text-center">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>

        {/* Built with */}
        <div className="flex items-center gap-2 text-white/25 text-[11px]">
          <span>Built with</span>
          <span className="text-white/40">React</span>
          <span>&middot;</span>
          <span className="text-white/40">TypeScript</span>
          <span>&middot;</span>
          <span className="text-white/40">Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
