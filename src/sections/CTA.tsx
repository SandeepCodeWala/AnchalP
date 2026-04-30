import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import GlowButton from "@/components/GlowButton";
import SectionHeading from "@/components/SectionHeading";
import { useI18n } from "@/i18n/i18n";

export default function CTA({ onStart }: { onStart: () => void }) {
  const reduceMotion = useReducedMotion();
  const { lang, t } = useI18n();
  const highlight = lang === "hi" ? "मार्गदर्शन" : "guidance";
  const headlineParts = t("ctaHeadline").split(highlight);

  return (
    <section id="cta" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker={t("ctaKicker")}
          title={t("ctaTitle")}
          subtitle={t("ctaSubtitle")}
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-8 ring-1 ring-black/10 dark:ring-white/10 sm:p-10"
        >
          <div className="absolute -left-44 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/14 blur-3xl" />
          <div className="absolute -right-44 top-1/3 h-96 w-96 -translate-y-1/2 rounded-full bg-violet-600/16 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:gap-10">
            <div>
              <div className="font-display text-3xl leading-tight text-zinc-950 dark:text-white">
                {headlineParts.length === 2 ? (
                  <>
                    {headlineParts[0]}
                    <span className="text-gold/90">{highlight}</span>
                    {headlineParts[1]}
                  </>
                ) : (
                  t("ctaHeadline")
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-white/70">
                {t("ctaBody")}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <GlowButton onClick={onStart} className="flex-1">
                  {t("ctaStartAnother")}
                </GlowButton>
                <GlowButton
                  variant="ghost"
                  className="flex-1"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {t("navContact")}
                </GlowButton>
              </div>

              <div className="mt-4 text-xs text-zinc-600 dark:text-white/50">
                {t("ctaReplaceNote")}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-black/10 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="text-xs uppercase tracking-[0.28em] text-zinc-600 dark:text-white/55">
                  {t("included")}
                </div>
                <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-white/70">
                  <li className="flex gap-3">
                    <span className="text-gold/85">✶</span>
                    {t("inc1")}
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold/85">✶</span>
                    {t("inc2")}
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold/85">✶</span>
                    {t("inc3")}
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold/85">✶</span>
                    {t("inc4")}
                  </li>
                </ul>
              </div>

              <div className="mt-4 rounded-3xl border border-gold/20 bg-gradient-to-b from-gold/10 to-transparent p-5 text-sm text-zinc-700 dark:text-white/70">
                <div className="font-display text-xl text-zinc-950 dark:text-white">
                  {t("ritualNote")}
                </div>
                <p className="mt-2 leading-relaxed">{t("ritualBody")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
