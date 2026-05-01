import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Container from "@/components/Container";
import GlowButton from "@/components/GlowButton";
import ParticlesCanvas from "@/components/ParticlesCanvas";
import TarotCard from "@/components/TarotCard";
import { profile } from "@/data/profile";
import { createDeckIds, getCard } from "@/data/tarot";
import { useI18n } from "@/i18n/i18n";

export default function Hero({ onStart }: { onStart: () => void }) {
  const { lang, t } = useI18n();
  const reduceMotion = useReducedMotion();
  const heroCard = useMemo(() => getCard(lang, createDeckIds()[0]), [lang]);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setFlipped((v) => !v), 5200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section id="top" className="relative">
      <div className="absolute inset-0 -z-10">
        <ParticlesCanvas className="absolute inset-0 opacity-[0.72]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/30 to-white dark:from-midnight/10 dark:via-midnight/35 dark:to-midnight" />
      </div>

      <Container className="pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.30em] text-zinc-600 dark:text-white/60">
            {t("heroKicker")}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.98] text-zinc-950 dark:text-white">
            <span className="bg-gradient-to-r from-gold/90 via-white to-accent bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              {t("brandName")}
            </span>
          </h1>
          <p className="mt-4 font-display text-[clamp(1.25rem,2.8vw,1.85rem)] leading-tight text-zinc-900/90 dark:text-white/90">
            {t("heroTitle")}
          </p>
          <p className="mt-5 text-balance text-sm leading-relaxed text-zinc-700 dark:text-white/70 sm:text-base">
            {t("heroSubtitle")}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-600 dark:text-white/60">
            <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 dark:border-white/10 dark:bg-white/[0.03]">
              {profile.expertise[lang]}
            </span>
            <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 dark:border-white/10 dark:bg-white/[0.03]">
              {profile.experience[lang]}
            </span>
            <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 dark:border-white/10 dark:bg-white/[0.03]">
              {profile.languages[lang]}
            </span>
            <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 dark:border-white/10 dark:bg-white/[0.03]">
              {profile.rating.value}★ ({profile.rating.count})
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton onClick={onStart}>{t("heroCtaChoose")}</GlowButton>
            <GlowButton
              variant="ghost"
              onClick={() =>
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              {t("heroCtaShuffle")}
            </GlowButton>
          </div>
        </div>

        {/* <div className="mt-14 grid place-items-center">
          <div className="relative h-[310px] w-[240px] sm:h-[380px] sm:w-[290px]">
            <motion.div
              aria-hidden
              className="absolute -inset-12 rounded-full bg-accent/15 blur-3xl"
              animate={reduceMotion ? undefined : { opacity: [0.35, 0.6, 0.35] }}
              transition={reduceMotion ? undefined : { duration: 4.8, repeat: Infinity }}
            />

            <motion.div
              className="absolute left-1/2 top-1/2 h-[280px] w-[200px] -translate-x-1/2 -translate-y-1/2 sm:h-[340px] sm:w-[240px]"
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute left-3 top-3 h-full w-full rotate-[-10deg] opacity-70">
                <TarotCard card={heroCard} className="h-full w-full" />
              </div>
              <div className="absolute left-1.5 top-1.5 h-full w-full rotate-[-5deg] opacity-85">
                <TarotCard card={heroCard} className="h-full w-full" />
              </div>
              <div className="absolute inset-0">
                <TarotCard
                  card={heroCard}
                  flipped={flipped}
                  interactive
                  aria-label="Flip hero card"
                  onClick={() => setFlipped((v) => !v)}
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.30em] text-zinc-600 dark:text-white/50">
            {t("heroTapFlip")}
          </p>
        </div> */}
      </Container>
    </section>
  );
}
