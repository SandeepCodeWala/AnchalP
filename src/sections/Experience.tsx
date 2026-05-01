import { forwardRef } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import TarotExperience from "@/components/TarotExperience";
import type { DrawnCard, ReadingStage, ReadingType, TarotCardData } from "@/data/tarot";
import { useI18n } from "@/i18n/i18n";

type Props = {
  reading: ReadingType;
  stage: ReadingStage;
  deck: TarotCardData[];
  drawn: DrawnCard[];
  question: string;
  onQuestionChange: (q: string) => void;
  onShuffle: () => void;
  onDraw: () => void;
  onReveal: () => void;
  onReset: () => void;
};

const STEPS = ["progressStep1", "progressStep2", "progressStep3", "progressStep4"] as const;

const stageToStep: Record<ReadingStage, number> = {
  idle: 0,
  shuffling: 1,
  drawing: 2,
  ready: 2,
  revealed: 3
};

function ProgressStepper({ stage }: { stage: ReadingStage }) {
  const { t } = useI18n();
  const active = stageToStep[stage];

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((key, idx) => {
        const done = idx < active;
        const current = idx === active;
        return (
          <div key={key} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  "grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-all duration-300",
                  done
                    ? "bg-accent text-white shadow-[0_0_12px_rgba(215,27,107,0.35)]"
                    : current
                    ? "bg-accent/20 text-accent ring-2 ring-accent/60 dark:bg-accent/15"
                    : "bg-black/[0.04] text-zinc-400 dark:bg-white/[0.05] dark:text-white/30"
                ].join(" ")}
              >
                {done ? "✓" : idx + 1}
              </div>
              <span
                className={[
                  "hidden sm:block text-[10px] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                  current
                    ? "text-accent dark:text-accent/90"
                    : done
                    ? "text-zinc-500 dark:text-white/40"
                    : "text-zinc-400 dark:text-white/25"
                ].join(" ")}
              >
                {t(key)}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={[
                  "mx-2 mb-5 h-px w-10 sm:w-16 transition-all duration-500",
                  idx < active
                    ? "bg-accent/60"
                    : "bg-black/10 dark:bg-white/10"
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const Experience = forwardRef<HTMLElement, Props>(function Experience(
  { reading, stage, deck, drawn, question, onQuestionChange, onShuffle, onDraw, onReveal, onReset },
  ref
) {
  const { t } = useI18n();

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-mt-20 py-6 sm:py-8"
    >
      <Container>
        <SectionHeading
          kicker={t("experienceKicker")}
          title={t("experienceTitle")}
          align="center"
          className="mb-6"
        />
        <ProgressStepper stage={stage} />
      </Container>

      <TarotExperience
        reading={reading}
        stage={stage}
        deck={deck}
        drawn={drawn}
        question={question}
        onQuestionChange={onQuestionChange}
        onShuffle={onShuffle}
        onDraw={onDraw}
        onReveal={onReveal}
        onReset={onReset}
      />
    </section>
  );
});

export default Experience;
