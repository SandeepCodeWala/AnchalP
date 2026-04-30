import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  className
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "mb-10",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-zinc-600 dark:text-white/60",
          align === "center" ? "justify-center" : ""
        )}
      >
        <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <span className="font-medium">{kicker}</span>
        <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.7rem)] leading-[1.05] text-zinc-950 dark:text-white"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <p className="mt-4 max-w-3xl text-balance text-sm leading-relaxed text-zinc-700 dark:text-white/70 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
