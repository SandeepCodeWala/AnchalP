import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { lang, t } = useI18n();

const testimonials = [
    { id: "9191675*****", date: "20 Apr 2026", quote: "very simple solutions. good readings.", meta: "Verified" },
    { id: "9172498*****", date: "6 Apr 2026", quote: "Thank you itna honest aur dil se guide karne ke liye… Aap sirf ek tarot reader nahi, ek beautiful soul ho 🌸", meta: "Beautiful Soul" },
    { id: "9172498*****", date: "2 Apr 2026", quote: "Nice Astrologer accurate reading 👌", meta: "Accurate" },
    { id: "9191745*****", date: "31 Mar 2026", quote: "आंचल जी, द्वारा किया गया रीडिंग मुझे 100% कनेक्ट होता है Thank you so much astrosaga team...🙏", meta: "100% Connect" },
    { id: "9191745*****", date: "19 Mar 2026", quote: "my favourite astrologer", meta: "Favourite" },
    { id: "9191745*****", date: "18 Mar 2026", quote: "best astrologer in the world ❤️", meta: "Best" },
    { id: "9191745*****", date: "18 Mar 2026", quote: "live prediction very good ❤️", meta: "Live Session" },
    { id: "9196967*****", date: "24 Feb 2026", quote: "Aapne mujhe jo samay diya aur itna achha consultation aur guidance diya, uske liye main dil se aabhari hoon. Aapki baaton se mujhe kaafi clarity aur confidence mila. Dhanyavaad Ma’am 😊\" Radhe Radhe", meta: "Confidence" },
    { id: "9196533*****", date: "1 Feb 2026", quote: "thank you for your teaching and support and guidance...for giving me hope and happiness God bless you", meta: "Support" },
    { id: "9191745*****", date: "29 Jan 2026", quote: "आंचल जी, द्वारा मेरे लिए किया हुआ रीडिंग, 100% सही होता है... मुझे life time आंचल जी से रीडिंग करानी है... tq ❤️", meta: "Lifetime Client" },
    { id: "9191745*****", date: "25 Jan 2026", quote: "आंचल जी, रीडिंग मुझे 100% सही बैठता है, उनके मार्गदर्शन में मुझे कैरियर में सफलता मिला है... tq❤️", meta: "Success" },
    { id: "9198939*****", date: "21 Jan 2026", quote: "बहुत अच्छी जानकारी प्रदान किए हो मेंंडम जी", meta: "Guidance" },
    { id: "9174042*****", date: "7 Jan 2026", quote: "Best readings and perfect prediction given by mam I am totally satisfied with her prediction and guidance. Thank you so much ma'am", meta: "Satisfied" },
    { id: "9182788*****", date: "7 Jan 2026", quote: "Good advice and give the positive guidance 😊", meta: "Positive" },
    { id: "9196967*****", date: "3 Jan 2026", quote: "Bahut hi achha Astro app hai. Jyotish ne sahi margdarshan diya. Career aur future ko leke clarity mili. Thank you 🙏⭐⭐⭐⭐⭐", meta: "Clarity" },
    { id: "9196967*****", date: "2 Jan 2026", quote: "Career growth aur job ke baare me bilkul clear guidance mila. Behaviour bhi bahut achha tha. Dobara consult karunga. ⭐⭐⭐⭐⭐", meta: "Career Growth" },
    { id: "9172498*****", date: "24 Nov 2025", quote: "Nice 👍", meta: "Verified" },
    { id: "9172498*****", date: "12 Nov 2025", quote: "Nice Astrologer 👌", meta: "Verified" }
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" className="scroll-mt-24 py-8 sm:py-12 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <SectionHeading
            kicker={t("testimonialsKicker")}
            title={t("testimonialsTitle")}
            subtitle={t("testimonialsSubtitle")}
            align="left"
            className="mb-0"
          />
          
          {/* Navigation Arrows */}
          <div className="flex gap-3 px-1">
            <button 
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/50 transition-all hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/50 transition-all hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              aria-label="Next"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 mb-12">
            <div className="glass relative overflow-hidden rounded-3xl p-8 ring-1 ring-black/10 dark:ring-white/10">
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">{t("statsRating")}</div>
                <div className="flex items-end gap-3">
                  <span className="font-display text-5xl font-medium text-zinc-950 dark:text-white">{profile.rating.value}</span>
                  <span className="text-zinc-500 mb-1 text-lg">/ {profile.rating.best}</span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-gold">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                  <span className="ml-3 text-sm text-zinc-500">({profile.rating.count} {t("reviews")})</span>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-accent/5 blur-3xl" />
            </div>

            <div className="glass relative overflow-hidden rounded-3xl p-8 ring-1 ring-black/10 dark:ring-white/10 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-widest mb-3">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Verified Platform Feed
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm italic leading-relaxed">
                "{lang === "hi" 
                  ? "सभी फीडबैक वास्तविक क्लाइंट्स और वेरिफाइड परचेस से लिए गए हैं।" 
                  : "Every piece of feedback is pulled from real client sessions and verified transactions."}"
              </p>
            </div>
        </div>

        {/* Horizontal Scrolling Reviews */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id + i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="min-w-[85vw] md:min-w-[400px] snap-center"
            >
              <div className="glass relative flex h-full flex-col rounded-[2.5rem] p-8 ring-1 ring-black/5 dark:ring-white/10 shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase">UID: {item.id}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{item.date}</div>
                  </div>
                  <div className="flex gap-0.5 text-[10px] text-gold">
                    {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                </div>

                <blockquote className="flex-grow text-[16px] leading-relaxed text-zinc-800 dark:text-zinc-200">
                  “{item.quote}”
                </blockquote>

                <div className="mt-8 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-5">
                  <span className="text-[9px] font-black uppercase tracking-tighter text-green-600/70">Verified</span>
                  <span className="rounded-full bg-accent/5 px-3 py-1 text-[10px] font-bold text-accent border border-accent/10">
                    {item.meta}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}