import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import type { ReadingType, ReadingTypeId } from "@/data/tarot";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/utils/cn";

type Props = {
  options: ReadingType[];
  selected: ReadingTypeId;
  onSelect: (id: ReadingTypeId) => void;
};

const ChooseReading = forwardRef<HTMLElement, Props>(function ChooseReading(
  { options, selected, onSelect },
  ref
) {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();

  return (
    <section
      id="readings"
      ref={ref}
      className="scroll-mt-24 py-8 sm:py-12"
    >
      <Container>
        <SectionHeading
          kicker={t("chooseKicker")}
          title={t("chooseTitle")}
          subtitle={t("chooseSubtitle")}
          align="center"
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((r, idx) => {
            const active = r.id === selected;
            return (
              <motion.button
                key={r.id}
                type="button"
                onClick={() => onSelect(r.id)}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : idx * 0.03,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                className={cn(
                  "group glass relative overflow-hidden rounded-3xl p-5 text-left ring-1 transition sm:p-6",
                  active
                    ? "ring-accent/40"
                    : "ring-black/10 hover:ring-black/18 dark:ring-white/10 dark:hover:ring-white/18"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="font-display text-xl tracking-wide text-zinc-950 dark:text-white">
                      {r.label}
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-700 dark:text-white/65">
                      {r.description}
                    </p>
                  </div>

                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-black/[0.03] text-lg text-gold/85 ring-1 ring-black/10 dark:bg-white/[0.03] dark:ring-white/10">
                    <span className="relative z-10">{r.icon}</span>
                    <span className="absolute inset-0 rounded-2xl bg-accent/15 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-zinc-600 dark:text-white/55">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-black/20 dark:bg-white/20" />
                    {t("chooseTouch")}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        active ? "bg-accent" : "bg-black/20 dark:bg-white/20"
                      )}
                    />
                    {active ? t("chooseSelected") : t("chooseSelect")}
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -left-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl" />
                  <div className="absolute -right-24 top-1/3 h-56 w-56 -translate-y-1/2 rounded-full bg-gold/10 blur-2xl" />
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-zinc-600 dark:text-white/50">
          {t("chooseTip")}
        </div>
      </Container>
    </section>
  );
});

export default ChooseReading;
