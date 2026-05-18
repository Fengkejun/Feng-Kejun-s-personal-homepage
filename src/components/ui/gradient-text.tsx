import { cn } from "@/lib/utils";

export const GradientText = ({
  children,
  className,
  colors = ["#3b82f6", "#8b5cf6", "#3b82f6"],
  animationSpeed = 8,
  showBorder = false,
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className={cn("relative mx-auto flex max-w-fit items-center", className)}>
      {showBorder && (
        <div
          className="absolute inset-0 z-0 animate-gradient bg-gradient-to-r from-transparent via-transparent to-transparent bg-[length:300%_100%] opacity-50"
          style={gradientStyle}
        />
      )}
      <div
        className="z-10 animate-gradient bg-clip-text text-transparent bg-[length:300%_100%]"
        style={gradientStyle}
      >
        {children}
      </div>
    </div>
  );
};
