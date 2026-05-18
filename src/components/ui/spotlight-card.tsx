import { useCallback, useRef } from "react";

export const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.12)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      divRef.current.style.setProperty("--mouse-x", `${x}px`);
      divRef.current.style.setProperty("--mouse-y", `${y}px`);
    },
    []
  );

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 ${className}`}
      style={{
        background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 60%)`,
      }}
    >
      {children}
    </div>
  );
};
