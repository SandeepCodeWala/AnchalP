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
    { id: "9196967*****", date: "24 Feb 2026", quote: "Aapne mujhe jo samay diya aur itna achha consultation aur guidance diya, uske liye main dil se aabhari hoon. Aapki baaton se mujhe kaafi clarity aur confidence mila. Dhanyavaad Ma’am 😊 Radhe Radhe", meta: "Confidence" },
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
    <section id="testimonials" className="scroll-mt-24 py-16 sm:py-24 overflow-hidden">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-8 gap-6">
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

        {/* Stats Grid - Added mb-20 for breathing room */}
        <div className="mx-auto max-w-5xl mb-0 md:mb-0">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Stats Card: Rating */}
            <div className="glass relative overflow-hidden rounded-3xl p-7 ring-1 ring-black/10 dark:ring-white/10 sm:p-9 shadow-sm">
              <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute -right-24 top-1/3 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

              <div className="relative">
                <div className="text-xs uppercase tracking-[0.28em] text-zinc-600 dark:text-white/55">
                  {t("statsRating")}
                </div>
                <div className="mt-4 flex items-end gap-3">
                  <div className="font-display text-6xl leading-none text-zinc-950 dark:text-white">
                    {profile.rating.value}
                  </div>
                  <div className="pb-1 text-lg text-zinc-600 dark:text-white/60">
                    /{profile.rating.best}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1 text-gold/90">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="drop-shadow-[0_0_14px_rgba(216,177,90,0.22)]">
                      {s}
                    </span>
                  ))}
                  <span className="ml-3 text-sm text-zinc-600 dark:text-white/60">
                    {t("ratingCount", { count: profile.rating.count })}
                  </span>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-xs text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70">
                  <span className="text-accent">●</span>
                  {t("asPerPlatform")}
                </div>
              </div>
            </div>

            {/* Stats Card: Followers/Style */}
            <div className="glass relative overflow-hidden rounded-3xl p-7 ring-1 ring-black/10 dark:ring-white/10 sm:p-9 shadow-sm">
              <div className="absolute -left-28 top-1/3 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
              <div className="absolute -right-28 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative">
                <div className="text-xs uppercase tracking-[0.28em] text-zinc-600 dark:text-white/55">
                  {t("statsFollowers")}
                </div>
                <div className="mt-4 font-display text-4xl text-zinc-950 dark:text-white">
                  {Intl.NumberFormat(lang === "hi" ? "hi-IN" : "en-IN").format(profile.followers)}+
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-white/65">
                  {lang === "hi"
                    ? "क्लाइंट्स अंचल की गर्मजोशी, स्पष्टता, और ईमानदार गाइडेंस को सबसे ज़्यादा याद रखते हैं।"
                    : "Clients consistently praise the accuracy of predictions and the deep sense of peace after a session."}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70">
                    {profile.languages[lang]}
                  </span>
                  <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70">
                    {profile.expertise[lang]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

           
        {/* Horizontal Scrolling Reviews - Added vertical padding (py-4) to prevent shadow clipping */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto py-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id + i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="min-w-[85vw] md:min-w-[420px] snap-center"
            >
              <div className="glass relative flex h-full flex-col rounded-[2.5rem] p-8 ring-1 ring-black/5 dark:ring-white/10 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">UID: {item.id}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{item.date}</div>
                  </div>
                  <div className="flex gap-0.5 text-[10px] text-gold">
                    {"★★★★★".split("").map((s, idx) => <span key={idx}>{s}</span>)}
                  </div>
                </div>

                <blockquote className="flex-grow text-[16px] leading-relaxed text-zinc-800 dark:text-zinc-200 italic">
                  “{item.quote}”
                </blockquote>

                <div className="mt-8 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-green-600/70">Verified Transaction</span>
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