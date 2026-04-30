import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "ghost";

type Ripple = { id: number; x: number; y: number };

type Props = Omit<HTMLMotionProps<"button">, "children"> & {
  variant?: Variant;
  children: ReactNode;
};

export default function GlowButton({
  variant = "primary",
  className,
  children,
  onPointerDown,
  type,
  ...props
}: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const outer = useMemo(() => {
    if (variant === "ghost") {
      return "border border-black/12 bg-black/0 hover:bg-black/[0.04] dark:border-white/12 dark:hover:bg-white/[0.03]";
    }
    return "bg-gradient-to-r from-accent via-violet-600 to-gold/80 shadow-glow";
  }, [variant]);

  const inner = useMemo(() => {
    if (variant === "ghost") {
      return "bg-white/70 dark:bg-midnight/35";
    }
    return "bg-gradient-to-b from-white/[0.06] to-midnight/70";
  }, [variant]);

  const text = useMemo(() => {
    if (variant === "ghost") return "text-zinc-900 dark:text-white/90";
    return "text-white/95";
  }, [variant]);

  return (
    <motion.button
      {...props}
      type={type ?? "button"}
      onPointerDown={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now() + Math.random();
        setRipples((r) => [...r, { id, x, y }]);
        window.setTimeout(
          () => setRipples((r) => r.filter((p) => p.id !== id)),
          650
        );
        onPointerDown?.(e);
      }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex select-none items-center justify-center rounded-full p-[1px] text-sm font-semibold tracking-wide",
        "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-midnight",
        "disabled:pointer-events-none disabled:opacity-50",
        text,
        outer,
        className
      )}
    >
      <span
        className={cn(
          "relative z-10 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3",
          "backdrop-blur-md",
          inner
        )}
      >
        {children}
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-[0.5px] animate-[ripple_650ms_ease-out]"
            style={{ left: r.x, top: r.y }}
          />
        ))}
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(650px circle at 50% 40%, rgba(215,27,107,0.22), transparent 55%)"
        }}
      />
    </motion.button>
  );
}
