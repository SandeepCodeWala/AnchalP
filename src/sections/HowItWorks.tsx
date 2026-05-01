import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { useI18n } from "@/i18n/i18n";

const steps = [
  { icon: "✦", tintClass: "bg-accent/10 text-accent dark:bg-accent/15", glowClass: "bg-accent/10" },
  { icon: "✶", tintClass: "bg-gold/10 text-gold/90 dark:bg-gold/15", glowClass: "bg-gold/10" },
  { icon: "♡", tintClass: "bg-violet-600/10 text-violet-500 dark:bg-violet-600/15", glowClass: "bg-violet-600/10" }
] as const;

export default function HowItWorks({ onStart }: { onStart: () => void }) {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();

  const cards = [
    { title: t("howStep1Title"), desc: t("howStep1Desc") },
    { title: t("howStep2Title"), desc: t("howStep2Desc") },
    { title: t("howStep3Title"), desc: t("howStep3Desc") }
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-10 sm:py-16">
      <Container>
        <SectionHeading
          kicker={t("howKicker")}
          title={t("howTitle")}
          align="center"
        />

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {cards.map((card, idx) => {
              const step = steps[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : idx * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="group glass relative overflow-hidden rounded-3xl p-6 ring-1 ring-black/10 dark:ring-white/10"
                >
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-60 ${step.glowClass}`} />

                  <div className="relative flex items-start gap-4">
                    <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl ring-1 ring-black/10 dark:ring-white/10 ${step.tintClass}`}>
                      {step.icon}
                    </div>
                    <div className="pt-0.5">
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/40">
                        Step {idx + 1}
                      </div>
                      <div className="mt-1 font-display text-lg leading-snug text-zinc-950 dark:text-white">
                        {card.title}
                      </div>
                    </div>
                  </div>

                  <p className="relative mt-4 text-sm leading-relaxed text-zinc-600 dark:text-white/60">
                    {card.desc}
                  </p>

                  {idx === 2 && (
                    <div className="relative mt-5">
                      <button
                        type="button"
                        onClick={onStart}
                        className="text-xs font-semibold tracking-wide text-accent underline-offset-2 hover:underline dark:text-accent/90"
                      >
                        Start your reading →
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-zinc-500 dark:text-white/40">
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/20" />
            <span>Takes about 2 minutes</span>
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/20" />
          </div>
        </div>
      </Container>
    </section>
  );
}
