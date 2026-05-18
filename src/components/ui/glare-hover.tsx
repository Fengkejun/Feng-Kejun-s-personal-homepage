import { useCallback, useRef } from "react";

export const GlareHover = ({
  children,
  className = "",
  background = "#0a0a0a",
  borderColor = "rgba(59, 130, 246, 0.2)",
  glareColor = "rgba(255, 255, 255, 0.08)",
  width = "100%",
  height = "100%",
  borderRadius = "12px",
}: {
  children: React.ReactNode;
  className?: string;
  background?: string;
  borderColor?: string;
  glareColor?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      containerRef.current.style.setProperty("--glare-x", `${x}%`);
      containerRef.current.style.setProperty("--glare-y", `${y}%`);
    },
    []
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        width,
        height,
        background,
        border: `1px solid ${borderColor}`,
        borderRadius,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), ${glareColor}, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
