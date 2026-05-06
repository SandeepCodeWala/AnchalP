import { forwardRef, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import GlowButton from "@/components/GlowButton";
import SectionHeading from "@/components/SectionHeading";
import TarotCard from "@/components/TarotCard";
import type { DrawnCard, ReadingStage, ReadingType } from "@/data/tarot";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n";

type Props = {
  reading: ReadingType;
  stage: ReadingStage;
  drawn: DrawnCard[];
  onRestart: () => void;
};

const Results = forwardRef<HTMLElement, Props>(function Results(
  { reading, stage, drawn, onRestart },
  ref
) {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();

  const themes = useMemo(() => {
    const words = drawn.flatMap((d) => d.card.keywords);
    return Array.from(new Set(words)).slice(0, 8);
  }, [drawn]);

  return (
    <section
      id="results"
      ref={ref}
      className="scroll-mt-20 py-6 sm:py-8"
    >
      <Container>
        <SectionHeading
          kicker={t("resultsKicker")}
          title={t("resultsTitle")}
          align="center"
          className="mb-5"
        />

        <AnimatePresence mode="wait">
          {stage !== "revealed" ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
              className="glass mx-auto max-w-4xl rounded-3xl p-8 text-center ring-1 ring-black/10 dark:ring-white/10"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-black/[0.03] text-2xl text-gold/85 ring-1 ring-black/10 dark:bg-white/[0.03] dark:ring-white/10">
                ✶
              </div>
              <div className="mt-4 font-display text-2xl text-zinc-950 dark:text-white">
                {t("resultsEmptyTitle")}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-white/65">
                {t("resultsEmptyBody")}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-5xl"
            >
              <div className="glass relative overflow-hidden rounded-3xl p-6 bg-white/90 ring-1 ring-black/10 dark:bg-white/[0.03] dark:ring-white/10 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.28em] text-zinc-600 dark:text-white/55">
                      {t("selectedReading")}
                    </div>
                    <div className="mt-2 font-display text-3xl text-zinc-950 dark:text-white">
                      {reading.label}
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-700 dark:text-white/70">
                      {t("themesRising")}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {themes.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-zinc-600 dark:text-white/55">
                    <span className="text-gold/80">✶</span> {t("spreadLegend")}
                  </div>
                </div>

                <div className="mt-8 grid place-items-center">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {drawn.map((d, i) => (
                      <motion.div
                        key={d.card.id}
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.45,
                          delay: reduceMotion ? 0 : i * 0.06
                        }}
                        className="h-[208px] w-[144px] justify-self-center"
                      >
                        <TarotCard
                          card={d.card}
                          flipped
                          className="h-full w-full"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {drawn.map((d, idx) => (
                  <motion.div
                    key={d.card.id}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      delay: reduceMotion ? 0 : idx * 0.05
                    }}
                    className="glass rounded-3xl p-6 bg-white/95 ring-1 ring-black/10 dark:bg-white/[0.03] dark:ring-white/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-display text-xl text-zinc-950 dark:text-white">
                          {d.card.name}
                        </div>
                        <div className="mt-1 text-xs uppercase tracking-[0.24em] text-zinc-600 dark:text-white/55">
                          {d.card.subtitle}
                        </div>
                      </div>
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black/[0.03] text-gold/85 ring-1 ring-black/10 dark:bg-white/[0.03] dark:ring-white/10">
                        {d.card.glyph}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {d.card.keywords.map((k) => (
                        <span
                          key={k}
                          className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70"
                        >
                          {k}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-white/70">
                      {d.card.meanings[reading.id]}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/8 via-accent/5 to-transparent p-6 text-center dark:from-gold/12">
                <div className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-white/40 mb-2">
                  {t("bookSessionSub")}
                </div>
                <div className="font-display text-xl text-zinc-950 dark:text-white mb-4">
                  {t("bookSession")}
                </div>
                <a
                  href={profile.contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent via-violet-600 to-gold/80 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span>💬</span>
                  {t("bookSession")}
                </a>
              </div>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <GlowButton onClick={onRestart}>{t("startAnother")}</GlowButton>
                <GlowButton
                  variant="ghost"
                  onClick={() =>
                    document
                      .getElementById("cta")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {t("goDeeper")}
                </GlowButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
});

export default Results;
