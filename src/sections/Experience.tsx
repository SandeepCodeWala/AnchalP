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
  onShuffle: () => void;
  onDraw: () => void;
  onReveal: () => void;
  onReset: () => void;
};

const Experience = forwardRef<HTMLElement, Props>(function Experience(
  { reading, stage, deck, drawn, onShuffle, onDraw, onReveal, onReset },
  ref
) {
  const { t } = useI18n();

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-mt-24 py-8 sm:py-12"
    >
      <Container>
        <SectionHeading
          kicker={t("experienceKicker")}
          title={t("experienceTitle")}
          subtitle={t("experienceSubtitle")}
          align="center"
        />
      </Container>

      <TarotExperience
        reading={reading}
        stage={stage}
        deck={deck}
        drawn={drawn}
        onShuffle={onShuffle}
        onDraw={onDraw}
        onReveal={onReveal}
        onReset={onReset}
      />
    </section>
  );
});

export default Experience;
