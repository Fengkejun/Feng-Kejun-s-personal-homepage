import { useEffect, useRef } from "react";

export const Particles = ({
  className = "",
  quantity = 60,
  staticity = 40,
  ease = 40,
  size = 0.6,
  color = "#3b82f6",
  vx = 0.4,
  vy = 0.4,
}: {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  color?: string;
  vx?: number;
  vy?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<
    {
      x: number;
      y: number;
      translateX: number;
      translateY: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      dx: number;
      dy: number;
      magnetism: number;
    }[]
  >([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = container.offsetWidth * dpr;
    canvas.height = container.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = container.offsetWidth + "px";
    canvas.style.height = container.offsetHeight + "px";

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < quantity; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width / dpr,
          y: Math.random() * canvas.height / dpr,
          translateX: 0,
          translateY: 0,
          size: Math.random() * 2 + size,
          alpha: Math.random(),
          targetAlpha: Math.random() * 0.6 + 0.1,
          dx: (Math.random() - 0.5) * 0.2 * vx,
          dy: (Math.random() - 0.5) * 0.2 * vy,
          magnetism: 0.1 + Math.random() * 4,
        });
      }
    };
    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      particlesRef.current.forEach((p) => {
        const edgeDistX = Math.min(p.x, canvas.width / dpr - p.x);
        const edgeDistY = Math.min(p.y, canvas.height / dpr - p.y);
        const edgeFade = Math.min(edgeDistX, edgeDistY, 80) / 80;

        p.translateX +=
          (mouseRef.current.x - p.x) / (staticity / p.magnetism) * 0.01;
        p.translateY +=
          (mouseRef.current.y - p.y) / (staticity / p.magnetism) * 0.01;

        p.x += p.dx + p.translateX;
        p.y += p.dy + p.translateY;

        p.translateX *= 1 - ease / 1000;
        p.translateY *= 1 - ease / 1000;

        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        p.alpha += (p.targetAlpha - p.alpha) * 0.02;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor(p.alpha * edgeFade * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [quantity, staticity, ease, size, color, vx, vy]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  );
};
