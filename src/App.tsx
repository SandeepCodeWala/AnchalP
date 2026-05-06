import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import About from "@/sections/About";
import ChooseReading from "@/sections/ChooseReading";
import Contact from "@/sections/Contact";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import Results from "@/sections/Results";
import Testimonials from "@/sections/Testimonials";
import {
  type ReadingStage,
  type ReadingTypeId,
  type TarotCardId,
  createDeckIds,
  getCard,
  getReadingTypes
} from "@/data/tarot";
import type { DrawnCard } from "@/data/tarot";
import { useI18n } from "@/i18n/i18n";
import { shuffle } from "@/utils/shuffle";

export default function App() {
  const { lang } = useI18n();
  const reduceMotion = useReducedMotion();

  const [readingType, setReadingType] = useState<ReadingTypeId>("love");
  const [stage, setStage] = useState<ReadingStage>("idle");
  const [question, setQuestion] = useState("");

  const [deckIds, setDeckIds] = useState<TarotCardId[]>(() =>
    shuffle(createDeckIds())
  );
  const [drawnIds, setDrawnIds] = useState<TarotCardId[]>([]);

  const shuffleToken = useRef(0);

  const readingsRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);

  const readingTypes = useMemo(() => getReadingTypes(lang), [lang]);
  const reading = useMemo(() => {
    return readingTypes.find((r) => r.id === readingType)!;
  }, [readingType, readingTypes]);

  const deck = useMemo(() => deckIds.map((id) => getCard(lang, id)), [deckIds, lang]);
  const drawn = useMemo<DrawnCard[]>(
    () => drawnIds.map((id) => ({ card: getCard(lang, id) })),
    [drawnIds, lang]
  );

  const scrollTo = (target: RefObject<HTMLElement>) => {
    target.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const reset = () => {
    shuffleToken.current += 1;
    setStage("idle");
    setDrawnIds([]);
    setDeckIds(shuffle(createDeckIds()));
    setQuestion("");
  };

  const selectReading = (id: ReadingTypeId) => {
    setReadingType(id);
    reset();
    scrollTo(experienceRef);
  };

  const doShuffle = async () => {
    if (stage === "shuffling") return;

    const token = (shuffleToken.current += 1);
    setStage("shuffling");
    setDrawnIds([]);
    setDeckIds(createDeckIds());

    await new Promise((r) => setTimeout(r, 250));
    if (shuffleToken.current !== token) return;

    setDeckIds(shuffle(createDeckIds()));
    setStage("drawing");
  };

  const drawCard = () => {
    if (stage !== "drawing") return;

    setDeckIds((currentDeck) => {
      const [top, ...rest] = currentDeck;
      if (!top) return currentDeck;

      setDrawnIds((existing) => {
        if (existing.length >= 3) return existing;
        return [...existing, top];
      });
      return rest;
    });
  };

  const reveal = async () => {
    if (stage !== "ready") return;
    const token = shuffleToken.current;
    setStage("revealed");
    if (reduceMotion) {
      scrollTo(resultsRef);
      return;
    }
    await new Promise((r) => setTimeout(r, 650));
    if (shuffleToken.current !== token) return;
    scrollTo(resultsRef);
  };

  useEffect(() => {
    if (stage === "drawing" && drawnIds.length === 3) setStage("ready");
  }, [drawnIds.length, stage]);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-zinc-900 dark:text-white">
      <Background />
      <Header
        readingLabel={reading.label}
        onStart={() => scrollTo(readingsRef)}
        onReset={() => {
          reset();
          scrollTo(experienceRef);
        }}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key="page"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <Hero onStart={() => scrollTo(readingsRef)} />
          <About />
          <HowItWorks onStart={() => scrollTo(readingsRef)} />
          <Testimonials />
          <ChooseReading
            ref={readingsRef}
            options={readingTypes}
            selected={readingType}
            onSelect={selectReading}
          />
          <Experience
            ref={experienceRef}
            reading={reading}
            stage={stage}
            deck={deck}
            drawn={drawn}
            question={question}
            onQuestionChange={setQuestion}
            onShuffle={doShuffle}
            onDraw={drawCard}
            onReveal={reveal}
            onReset={() => {
              reset();
              scrollTo(experienceRef);
            }}
          />
          <Results
            ref={resultsRef}
            reading={reading}
            stage={stage}
            drawn={drawn}
            onRestart={() => {
              reset();
              scrollTo(experienceRef);
            }}
          />
          <Contact />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
