import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import GlowButton from "@/components/GlowButton";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n";

function Stat({
  label,
  value,
  sub
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="text-xs uppercase tracking-[0.24em] text-zinc-600 dark:text-white/55">
        {label}
      </div>
      <div className="mt-2 font-display text-xl text-zinc-950 dark:text-white">
        {value}
      </div>
      {sub && (
        <div className="mt-2 text-xs text-zinc-600 dark:text-white/55">{sub}</div>
      )}
    </div>
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();
  const { lang, t } = useI18n();

  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker={t("aboutKicker")}
          title={t("aboutTitle")}
          subtitle={t("aboutSubtitle")}
        />

        <div className="grid gap-5 lg:grid-cols-[1.25fr,0.75fr]">
          <div className="glass relative overflow-hidden rounded-3xl p-7 ring-1 ring-black/10 dark:ring-white/10 sm:p-9">
            <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

            <div className="relative space-y-4">
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-white/70">
                {t("aboutP1")}
              </p>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-white/70">
                {t("aboutP2")}
              </p>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-white/70">
                {t("aboutP3")}
              </p>

              <div className="mt-6 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/10 to-transparent p-5 text-sm text-zinc-700 dark:text-white/70">
                <div className="font-display text-xl text-zinc-950 dark:text-white">
                  {lang === "hi" ? "रिचुअल प्रॉम्प्ट" : "Ritual prompt"}
                </div>
                <p className="mt-2 leading-relaxed">
                  {lang === "hi"
                    ? "शफल से पहले एक सवाल मन में रखें — और जवाब को मजबूर न करें, उसे आने दें।"
                    : "Before you shuffle, hold one question in your mind — don’t force an answer, invite it."}
                </p>
                <div className="mt-4 rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm text-zinc-800 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/75">
                  {lang === "hi"
                    ? "“मैं क्या छोड़ने के लिए तैयार हूं, और क्या शुरू होने के लिए तैयार है?”"
                    : "“What am I being guided to release, and what is ready to begin?”"}
                </div>
              </div>
            </div>
          </div>

          <div className="glass relative overflow-hidden rounded-3xl p-7 ring-1 ring-black/10 dark:ring-white/10 sm:p-9">
            <motion.div
              aria-hidden
              className="absolute -top-28 right-0 h-72 w-72 rounded-full bg-accent/12 blur-3xl"
              animate={reduceMotion ? undefined : { y: [0, 18, 0] }}
              transition={reduceMotion ? undefined : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative">
              <div className="text-xs uppercase tracking-[0.28em] text-zinc-600 dark:text-white/55">
                {lang === "hi" ? "प्रोफाइल हाइलाइट्स" : "Profile highlights"}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Stat label={t("statsExpertise")} value={profile.expertise[lang]} />
                <Stat label={t("statsExperience")} value={profile.experience[lang]} />
                <Stat label={t("statsLanguages")} value={profile.languages[lang]} />
                <Stat
                  label={t("statsRating")}
                  value={`${profile.rating.value}/${profile.rating.best}`}
                  sub={t("ratingCount", { count: profile.rating.count })}
                />
                <Stat
                  label={t("statsFollowers")}
                  value={Intl.NumberFormat(lang === "hi" ? "hi-IN" : "en-IN").format(
                    profile.followers
                  )}
                />
                <Stat
                  label={t("statsStartingAt")}
                  value={`₹${profile.startingAtInrPerMin} ${t("perMin")}`}
                  sub={t("asPerPlatform")}
                />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <GlowButton
                  onClick={() => window.open(profile.platformUrl, "_blank", "noreferrer")}
                >
                  {lang === "hi" ? "AstroSage पर प्रोफाइल देखें" : "View profile on AstroSage"}
                </GlowButton>
                <GlowButton
                  variant="ghost"
                  onClick={() =>
                    document
                      .getElementById("readings")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {t("heroCtaChoose")}
                </GlowButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
