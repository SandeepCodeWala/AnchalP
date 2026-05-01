import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import type { DrawnCard, ReadingStage, ReadingType, TarotCardData } from "@/data/tarot";
import Container from "@/components/Container";
import GlowButton from "@/components/GlowButton";
import TarotCard from "@/components/TarotCard";
import { cn } from "@/utils/cn";
import { useI18n } from "@/i18n/i18n";

function StageLabel({ stage }: { stage: ReadingStage }) {
  const { t } = useI18n();
  const map: Record<ReadingStage, string> = {
    idle: t("stagePrepare"),
    shuffling: t("stageShuffling"),
    drawing: t("stageDraw"),
    ready: t("stageReveal"),
    revealed: t("stageComplete")
  };
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {map[stage]}
    </span>
  );
}

function PlaceholderCard({ label }: { label: string }) {
  const { t } = useI18n();
  return (
    <div className="group relative h-[208px] w-[144px] shrink-0 snap-center rounded-2xl border border-black/10 bg-black/[0.02] ring-1 ring-black/6 dark:border-white/10 dark:bg-white/[0.02] dark:ring-white/6 sm:justify-self-center">
      <div className="absolute inset-[10px] rounded-xl border border-dashed border-black/10 dark:border-white/10" />
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-2xl text-zinc-600 dark:text-white/50">✶</div>
          <div className="mt-3 text-xs uppercase tracking-[0.26em] text-zinc-600 dark:text-white/55">
            {label}
          </div>
          <div className="mt-2 text-xs text-zinc-500 dark:text-white/45">
            {t("waiting")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TarotExperience({
  reading,
  stage,
  deck,
  drawn,
  question,
  onQuestionChange,
  onShuffle,
  onDraw,
  onReveal,
  onReset
}: {
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
}) {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const stack = deck.slice(0, Math.min(7, deck.length));

  const canDraw = stage === "drawing" && deck.length > 0 && drawn.length < 3;
  const helper: Record<ReadingStage, string> = {
    idle: t("helperIdle"),
    shuffling: t("helperShuffling"),
    drawing: t("helperDrawing"),
    ready: t("helperReady"),
    revealed: t("helperRevealed")
  };

  const positions = [t("positionPast"), t("positionPresent"), t("positionFuture")];

  return (
    <LayoutGroup>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr,1.2fr] lg:gap-14">
          <div className="glass relative overflow-hidden rounded-3xl p-6 ring-1 ring-black/10 dark:ring-white/10 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-sm text-zinc-600 dark:text-white/60">
                  {t("selectedReading")}
                </div>
                <div className="font-display text-2xl tracking-wide text-zinc-950 dark:text-white">
                  {reading.label}
                </div>
              </div>
              <StageLabel stage={stage} />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-white/70">
              {helper[stage]}
            </p>

            {stage === "idle" ? (
              <div className="mt-5">
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-white/55 mb-2">
                  {t("questionLabel")}
                </label>
                <textarea
                  value={question}
                  onChange={(e) => onQuestionChange(e.target.value)}
                  placeholder={t("questionPlaceholder")}
                  rows={2}
                  className="w-full resize-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/30"
                />
                <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-white/35">{t("questionHint")}</p>
              </div>
            ) : question ? (
              <div className="mt-5 rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3 dark:bg-gold/10">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/70 mb-1">{t("questionLabel")}</div>
                <p className="text-sm italic text-zinc-700 dark:text-white/70 line-clamp-2">{question}</p>
              </div>
            ) : null}

            <div className="mt-7 flex items-center gap-3">
              <div className="text-xs text-zinc-600 dark:text-white/50">
                {t("deckLabel")}:{" "}
                <span className="text-zinc-900 dark:text-white/70">{deck.length}</span>
              </div>
              <div className="h-4 w-px bg-black/10 dark:bg-white/10" />
              <div className="text-xs text-zinc-600 dark:text-white/50">
                {t("drawnLabel")}:{" "}
                <span className="text-zinc-900 dark:text-white/70">
                  {drawn.length}/3
                </span>
              </div>
            </div>

            <div className="mt-8">
              <div className="relative mx-auto h-[260px] w-full max-w-[320px]">
                {stack.map((c, idx) => {
                  const baseX = idx * 2;
                  const baseY = -idx * 3;
                  const baseRotate = -idx * 1.25;
                  const wiggle = stage === "shuffling" && !reduceMotion;

                  return (
                    <div
                      key={c.id}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <motion.div
                        animate={
                          wiggle
                            ? {
                                x: [baseX, baseX + (idx % 2 ? 18 : -18), baseX],
                                y: [baseY, baseY + (idx % 2 ? -12 : 12), baseY],
                                rotate: [
                                  baseRotate,
                                  baseRotate + (idx % 2 ? 8 : -8),
                                  baseRotate
                                ]
                              }
                            : { x: baseX, y: baseY, rotate: baseRotate }
                        }
                        transition={{
                          duration: reduceMotion ? 0 : 0.85,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <div
                          className={cn(
                            "h-[208px] w-[144px]",
                            idx === 0
                              ? "drop-shadow-[0_0_22px_rgba(215,27,107,0.18)]"
                              : ""
                          )}
                        >
                          <TarotCard
                            card={c}
                            flipped={false}
                            interactive={idx === 0 && canDraw}
                            aria-label={idx === 0 ? t("drawACard") : undefined}
                            onClick={idx === 0 ? onDraw : undefined}
                            className="h-full w-full"
                            layoutId={`deck-${c.id}`}
                          />
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <GlowButton
                  className="flex-1"
                  onClick={onShuffle}
                  disabled={stage === "shuffling"}
                >
                  {stage === "idle" ? t("shuffleDeck") : t("shuffleAgain")}
                </GlowButton>

                <GlowButton
                  className="flex-1"
                  variant="ghost"
                  onClick={onReset}
                >
                  {t("resetSpread")}
                </GlowButton>
              </div>

              <div className="mt-3 text-xs text-zinc-600 dark:text-white/50">
                {t("tipMobile")}
              </div>
            </div>
          </div>

          <div className="glass relative overflow-hidden rounded-3xl p-6 ring-1 ring-black/10 dark:ring-white/10 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm text-zinc-600 dark:text-white/60">
                  {t("spreadTitle")}
                </div>
                <div className="mt-1 font-display text-2xl tracking-wide text-zinc-950 dark:text-white">
                  {t("revealTitle")}
                </div>
              </div>
              <div className="text-xs text-zinc-600 dark:text-white/60">
                <span className="text-gold/80">✶</span> {t("spreadLegend")}
              </div>
            </div>

            <div className="mt-8 grid place-items-center">
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0">
                {Array.from({ length: 3 }).map((_, i) => {
                  const slot = drawn[i];
                  if (!slot) return (
                    <div key={i} className="flex flex-col items-center gap-2 shrink-0 snap-center">
                      <PlaceholderCard label={positions[i]} />
                      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-400 dark:text-white/25">
                        {positions[i]}
                      </span>
                    </div>
                  );

                  return (
                    <div key={slot.card.id} className="flex flex-col items-center gap-2 shrink-0 snap-center sm:shrink sm:justify-self-center">
                      <motion.div
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.35 }}
                        className="h-[208px] w-[144px]"
                      >
                        <TarotCard
                          card={slot.card}
                          flipped={stage === "revealed"}
                          interactive={stage === "revealed"}
                          className="h-full w-full"
                          layoutId={`deck-${slot.card.id}`}
                        />
                      </motion.div>
                      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-white/40">
                        {positions[i]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <GlowButton
                className="flex-1"
                onClick={onDraw}
                disabled={!canDraw}
              >
                {t("drawACard")}
              </GlowButton>

              <GlowButton
                className="flex-1"
                variant="ghost"
                onClick={onReveal}
                disabled={stage !== "ready"}
              >
                {t("revealReading")}
              </GlowButton>
            </div>

            <div className="mt-3 text-xs text-zinc-600 dark:text-white/50">
              {t("spreadHint")}
            </div>
          </div>
        </div>
      </Container>
    </LayoutGroup>
  );
}
