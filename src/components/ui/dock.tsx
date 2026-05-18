import { useState } from "react";

type SpringOptions = { stiffness?: number; damping?: number; mass?: number };

const useSpring = (
  target: number,
  _config: SpringOptions = {}
) => {
  const [value, setValue] = useState(target);

  const set = (newVal: number) => {
    setValue(newVal);
  };

  return [value, set] as const;
};

export const Dock = ({
  items,
  className = "",
}: {
  items: { icon: React.ReactNode; label: string; href: string }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [, setMagnification] = useSpring(48, { stiffness: 120, damping: 12 });

  const getItemSize = (index: number) => {
    if (hoveredIndex === null) return 48;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 64;
    if (distance === 1) return 56;
    if (distance === 2) return 48;
    return 40;
  };

  const getTranslateY = (index: number) => {
    if (hoveredIndex === null) return 0;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return -12;
    if (distance === 1) return -6;
    if (distance === 2) return -2;
    return 0;
  };

  return (
    <div
      className={`flex items-end justify-center gap-2 rounded-2xl border border-neutral-700/50 bg-neutral-900/80 backdrop-blur-md px-4 py-3 ${className}`}
    >
      {items.map((item, index) => {
        const size = getItemSize(index);
        const translateY = getTranslateY(index);
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 transition-all duration-300 ease-out hover:bg-neutral-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 group"
            style={{
              width: size,
              height: size,
              transform: `translateY(${translateY}px)`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setMagnification(48);
            }}
          >
            <span className="text-neutral-300 group-hover:text-blue-400 transition-colors" style={{ fontSize: size * 0.45 }}>
              {item.icon}
            </span>
            <span className="absolute -top-8 px-2 py-1 rounded bg-neutral-800 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </a>
        );
      })}
    </div>
  );
};
