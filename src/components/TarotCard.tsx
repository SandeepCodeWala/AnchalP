import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { TarotCardData } from "@/data/tarot";
import { cn } from "@/utils/cn";

type Props = {
  card: TarotCardData;
  flipped?: boolean;
  interactive?: boolean;
  className?: string;
  layoutId?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

export default function TarotCard({
  card,
  flipped = false,
  interactive = false,
  className,
  layoutId,
  onClick,
  ...aria
}: Props) {
  const reduceMotion = useReducedMotion();
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const isClickable = interactive && Boolean(onClick);

  useEffect(() => {
    if (reduceMotion) return;
    const mq = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    setTiltEnabled(Boolean(mq?.matches));
    const onChange = () => setTiltEnabled(Boolean(mq?.matches));
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, [reduceMotion]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(35);

  const glare = useMotionTemplate`radial-gradient(360px circle at ${glareX}% ${glareY}%, rgba(216, 177, 90, 0.18), transparent 55%)`;

  const resetTilt = () => {
    animate(rotateX, 0, { type: "spring", stiffness: 210, damping: 18 });
    animate(rotateY, 0, { type: "spring", stiffness: 210, damping: 18 });
    animate(glareX, 50, { type: "spring", stiffness: 190, damping: 20 });
    animate(glareY, 35, { type: "spring", stiffness: 190, damping: 20 });
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (!tiltEnabled) return;
    if (e.pointerType !== "mouse") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rY = (px - 0.5) * 10;
    const rX = (0.5 - py) * 10;

    rotateX.set(rX);
    rotateY.set(rY);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const baseBack = useMemo(
    () => (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700/25 via-midnight to-violet-950 ring-1 ring-white/12">
        <div className="absolute inset-[10px] rounded-xl border border-white/10" />
        <div className="absolute inset-[18px] rounded-lg border border-white/6" />

        <div className="absolute inset-0 opacity-80">
          <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-2xl" />
          <div className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-2xl" />
        </div>

        <div className="absolute inset-0 grid place-items-center">
          <div className="grid place-items-center">
            <div className="font-display text-3xl tracking-wide text-gold/90">
              ✶
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/65">
              Anchal P
            </div>
          </div>
        </div>

        <div className="absolute left-4 top-4 text-xs text-white/60">☾</div>
        <div className="absolute bottom-4 right-4 text-xs text-white/60">☉</div>

        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-transparent to-gold/10" />
          <div className="absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      </div>
    ),
    []
  );

  return (
    <motion.div
      layoutId={layoutId}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX, rotateY }}
      className={cn(
        "group relative select-none [perspective:1200px]",
        isClickable ? "cursor-pointer" : "cursor-default",
        className
      )}
      {...aria}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : -1}
      onKeyDown={(e) => {
        if (!isClickable) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <motion.div
        className={cn(
          "relative h-full w-full rounded-2xl transition-shadow duration-300",
          interactive ? "group-hover:shadow-glow" : "",
          "[transform-style:preserve-3d]"
        )}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.85,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {baseBack}
        </div>

        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-violet-700/18 via-midnight to-violet-950 ring-1 ring-gold/25">
            <div className="absolute inset-[10px] rounded-xl border border-white/10" />
            <div className="absolute inset-[18px] rounded-lg border border-white/6" />

            <div className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.26em] text-white/55">
              Major Arcana
            </div>

            <div className="absolute inset-0 grid place-items-center px-5 text-center">
              <div>
                <div className="text-5xl text-gold/85 drop-shadow-[0_0_30px_rgba(216,177,90,0.18)]">
                  {card.glyph}
                </div>
                <div className="mt-5 font-display text-xl leading-tight text-white">
                  {card.name}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.25em] text-white/55">
                  {card.subtitle}
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {card.keywords.slice(0, 3).map((k) => (
                    <span
                      key={k}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/70"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-midnight/90 to-transparent" />
            {isClickable && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-white/45">
                Tap to return
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {!reduceMotion && (
        <motion.div
          aria-hidden
          style={{ backgroundImage: glare }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}
