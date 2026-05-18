export const InfiniteScroll = ({
  items,
  direction = "left",
  speed = 40,
  className = "",
}: {
  items: { text: string; icon?: React.ReactNode }[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}) => {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className={`scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${className}`}
      style={{
        ["--animation-duration" as string]: `${speed}s`,
        ["--animation-direction" as string]: direction === "left" ? "forwards" : "reverse",
      }}
    >
      <ul className="flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 animate-scroll hover:[animation-play-state:paused]">
        {duplicatedItems.map((item, idx) => (
          <li
            key={idx}
            className="relative shrink-0 rounded-2xl border border-neutral-700 bg-gradient-to-b from-neutral-800 to-neutral-900 px-6 py-4 flex items-center gap-3 hover:border-blue-500/40 transition-colors"
          >
            {item.icon && (
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
            )}
            <span className="text-sm leading-relaxed font-normal text-neutral-200 whitespace-nowrap">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
