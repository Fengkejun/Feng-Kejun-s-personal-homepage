import { useEffect, useRef, useState } from "react";

export const SplitText = ({
  text,
  className = "",
  delay = 30,
  animationFrom = { opacity: "0", transform: "translateY(20px)" },
  animationTo = { opacity: "1", transform: "translateY(0)" },
  threshold = 0.2,
  rootMargin = "0px",
}: {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: Record<string, string>;
  animationTo?: Record<string, string>;
  threshold?: number;
  rootMargin?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split("").map((char, charIndex) => {
            const globalIndex =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
              charIndex;
            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: isVisible ? animationTo.opacity : animationFrom.opacity,
                  transform: isVisible
                    ? animationTo.transform
                    : animationFrom.transform,
                  transition: `opacity 0.5s ease ${globalIndex * delay}ms, transform 0.5s ease ${globalIndex * delay}ms`,
                }}
              >
                {char}
              </span>
            );
          })}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </div>
  );
};
