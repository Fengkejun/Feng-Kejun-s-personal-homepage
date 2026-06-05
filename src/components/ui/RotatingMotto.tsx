import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface RotatingMottoProps {
  mottos: string[];
  interval?: number;
  className?: string;
}

export default function RotatingMotto({
  mottos,
  interval = 4000,
  className = "",
}: RotatingMottoProps) {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * mottos.length)
  );
  const ref = useRef<HTMLSpanElement>(null);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mottos.length);
    }, interval);
    return () => clearInterval(timer);
  }, [mottos.length, interval]);

  // Animate on change
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 6, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
    );
  }, [index]);

  return (
    <span
      ref={ref}
      className={`block text-white/30 text-xs text-center italic mt-2 ${className}`}
    >
      "{mottos[index]}"
    </span>
  );
}
