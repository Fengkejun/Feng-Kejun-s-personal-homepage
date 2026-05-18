export const StarBorder = ({
  children,
  className = "",
  color = "#3b82f6",
  speed = "5s",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  speed?: string;
}) => {
  return (
    <div
      className={`relative group rounded-xl overflow-hidden ${className}`}
    >
      {/* Animated star border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
          animation: `star-border-spin ${speed} linear infinite`,
        }}
      />
      {/* Inner glow on hover */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${color}30, transparent 50%, ${color}30)`,
          animation: `star-border-spin ${speed} linear infinite`,
        }}
      />
      <div className="relative rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};
