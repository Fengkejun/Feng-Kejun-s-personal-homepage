import { useCallback, useEffect, useRef } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
}

export const ClickSpark = ({
  children,
  sparkColor = "#3b82f6",
  sparkSize = 10,
  sparkRadius = 35,
  sparkCount = 8,
  duration = 400,
  className,
}: {
  children: React.ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = Date.now() - spark.id;
        const progress = elapsed / duration;

        if (progress >= 1) return false;

        const angle = (Math.PI * 2) / sparkCount;
        for (let i = 0; i < sparkCount; i++) {
          const currentAngle = angle * i;
          const distance = sparkRadius * progress;
          const x = spark.x + Math.cos(currentAngle) * distance;
          const y = spark.y + Math.sin(currentAngle) * distance;
          const opacity = 1 - progress;
          const size = sparkSize * (1 - progress);

          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fillStyle =
            sparkColor +
            Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0");
          ctx.fill();
        }
        return true;
      });

      if (sparksRef.current.length > 0) {
        animRef.current = requestAnimationFrame(() => draw(ctx));
      }
    },
    [sparkColor, sparkCount, sparkRadius, sparkSize, duration]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      sparksRef.current.push({ id: now, x: e.clientX, y: e.clientY });
      if (now - lastTimeRef.current > 50) {
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(() => draw(ctx));
        lastTimeRef.current = now;
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", handleClick);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
      />
      {children}
    </div>
  );
};
