import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

interface NavChild {
  name: string;
  link: string;
}

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
  children?: NavChild[];
}

function NavLink({
  to,
  className,
  children,
  onClick,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const location = useLocation();

  // Hash links on homepage: use native anchor for smooth scroll
  if (to.startsWith("/#") && location.pathname === "/") {
    const hash = to.replace("/", "");
    return (
      <a href={hash} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  // All other links: use <a> tag (handles both cross-page hash and route links)
  return (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownParentClick = (item: NavItem) => {
    const wasOpen = openDropdown === item.name;
    setOpenDropdown(wasOpen ? null : item.name);
    if (item.link.startsWith("/#")) {
      const hash = item.link.substring(2);
      if (location.pathname === "/") {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = item.link;
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto z-[5000] items-center justify-center",
          className
        )}
        ref={dropdownRef}
      >
        <div className="flex items-center justify-center gap-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/[0.08] px-3 py-2 shadow-2xl shadow-black/30">
          {navItems.map((navItem, idx) => (
            <div key={`nav-${idx}`} className="relative">
              {navItem.children ? (
                <>
                  <button
                    onClick={() => handleDropdownParentClick(navItem)}
                    className="relative flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[15px] font-medium text-slate-400 transition-all duration-300 hover:text-slate-200 hover:bg-white/[0.06]"
                  >
                    <span className="hidden sm:block">{navItem.name}</span>
                    <svg
                      className={cn(
                        "w-3.5 h-3.5 transition-transform hidden sm:block",
                        openDropdown === navItem.name && "rotate-180"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openDropdown === navItem.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 rounded-xl bg-black/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden"
                      >
                        <div className="py-2">
                          {navItem.children.map((child, ci) => (
                            <NavLink
                              key={ci}
                              to={child.link}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-5 py-2.5 text-[15px] text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-colors"
                            >
                              {child.name}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <NavLink
                  to={navItem.link}
                  className="relative flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[15px] font-medium text-slate-400 transition-all duration-300 hover:text-slate-200 hover:bg-white/[0.06]"
                >
                  <span className="block sm:hidden">{navItem.icon}</span>
                  <span className="hidden sm:block">{navItem.name}</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
