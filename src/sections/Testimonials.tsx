import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n";

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const { lang, t } = useI18n();

  const testimonials =
    lang === "hi"
      ? [
          {
            quote:
              "रीडिंग का टोन बहुत शांत और स्पष्ट था — जवाबों में warmth और honesty दोनों महसूस हुई।",
            name: "क्लाइंट",
            meta: "प्रेम रीडिंग"
          },
          {
            quote:
              "कार्ड्स की व्याख्या practical लगी। मुझे अगले कदम का direction मिला, बिना डर पैदा किए।",
            name: "क्लाइंट",
            meta: "करियर रीडिंग"
          },
          {
            quote:
              "मुझे सबसे ज़्यादा पसंद आया: judgment नहीं, सिर्फ clarity। अनुभव सच में प्रीमियम लगा।",
            name: "क्लाइंट",
            meta: "स्पष्टता रीडिंग"
          }
        ]
      : [
          {
            quote:
              "The session felt calm and clear — warmth, honesty, and guidance that landed without overwhelm.",
            name: "Client",
            meta: "Love reading"
          },
          {
            quote:
              "The interpretation was practical. I left with a direction and a next step, not just vibes.",
            name: "Client",
            meta: "Career reading"
          },
          {
            quote:
              "What I loved most: no judgment, just clarity. It genuinely felt premium and intentional.",
            name: "Client",
            meta: "Clarity reading"
          }
        ];

  return (
    <section id="testimonials" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker={t("testimonialsKicker")}
          title={t("testimonialsTitle")}
          subtitle={t("testimonialsSubtitle")}
          align="center"
        />

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass relative overflow-hidden rounded-3xl p-7 ring-1 ring-black/10 dark:ring-white/10 sm:p-9">
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

            <div className="glass relative overflow-hidden rounded-3xl p-7 ring-1 ring-black/10 dark:ring-white/10 sm:p-9">
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
                    : "Clients come back for warmth, clarity, and honest guidance that feels grounded — not dramatic."}
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

        <div className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                delay: reduceMotion ? 0 : i * 0.05
              }}
              className="glass relative overflow-hidden rounded-3xl p-6 ring-1 ring-black/10 dark:ring-white/10"
            >
              <div className="absolute -left-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute -right-24 top-1/3 h-56 w-56 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

              <blockquote className="relative text-base leading-relaxed text-zinc-700 dark:text-white/70">
                “{t.quote}”
              </blockquote>
              <figcaption className="relative mt-6 flex items-center justify-between text-xs text-zinc-600 dark:text-white/55">
                <span className="font-medium text-zinc-900 dark:text-white/75">{t.name}</span>
                <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70">
                  {t.meta}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
