import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import GlowButton from "@/components/GlowButton";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n";
import ProfileImage from "../data/profile.jpg";

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white/50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</div>
      <div className="mt-1 font-display text-base font-medium text-zinc-950 dark:text-white">{value}</div>
      {sub && <div className="mt-1 text-[10px] text-zinc-500">{sub}</div>}
    </div>
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();
  const { lang, t } = useI18n();

  return (
    <section id="about" className="scroll-mt-24 py-8 sm:py-12">
      <Container>
        <SectionHeading
          kicker={t("aboutKicker")}
          title={t("aboutTitle")}
          subtitle={t("aboutSubtitle")}
        />

        {/* Changed items-start to items-stretch or removed for natural flow */}
        <div className="mt-0 grid gap-10 lg:grid-cols-12 lg:mt-0">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p className="font-light">{t("aboutP1")}</p>
              <p className="font-light">{t("aboutP2")}</p>
              <p className="font-light">{t("aboutP3")}</p>
            </div>

            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6 dark:bg-gold/10">
              <h4 className="font-display font-bold uppercase tracking-tighter text-gold mb-2">
                {lang === "hi" ? "रिचुअल प्रॉम्प्ट" : "Ritual Prompt"}
              </h4>
              <p className="text-sm italic opacity-80 mb-4 text-zinc-800 dark:text-zinc-200">
                {lang === "hi"
                  ? "शफल से पहले एक सवाल मन में रखें — और जवाब को मजबूर न करें।"
                  : "Before you shuffle, hold one question in your mind — don’t force an answer."}
              </p>
              <div className="rounded-lg bg-white/50 dark:bg-black/20 p-4 border border-white/20">
                <p className="text-center font-medium">
                  {lang === "hi"
                    ? "“मैं क्या छोड़ने के लिए तैयार हूं?”"
                    : "“What am I being guided to release?”"}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE BLOCK - Pulled up using lg:-mt-12 to align with top of text */}
          <div className="lg:col-span-5 lg:-mt-20"> 
            <div className="glass relative overflow-hidden rounded-[2rem] p-6 ring-1 ring-black/5 dark:ring-white/10 shadow-2xl backdrop-blur-md">
              
              {/* Profile Image Area */}
              <div className="relative mb-6 flex justify-center">
                <div className="relative">
                  <img
                    src={ProfileImage}
                    alt="Profile"
                    className="h-64 w-56 rounded-2xl object-cover ring-4 ring-white/10"
                  />
                  <div className="absolute -right-2 -top-2 rounded-full bg-blue-500 p-1.5 ring-4 ring-white dark:ring-zinc-900">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <Stat label={t("statsExpertise")} value={profile.expertise[lang]} />
                <Stat label={t("statsExperience")} value={profile.experience[lang]} />
                <Stat label={t("statsLanguages")} value={profile.languages[lang]} />
                <Stat label={t("statsRating")} value={`${profile.rating.value}/${profile.rating.best}`} />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <GlowButton className="w-full" onClick={() => window.open(profile.platformUrl, "_blank")}>
                  {lang === "hi" ? "AstroSage पर देखें" : "View on AstroSage"}
                </GlowButton>
                {/* <button 
                   onClick={() => document.getElementById("readings")?.scrollIntoView({ behavior: "smooth" })}
                   className="w-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors"
                >
                  {t("heroCtaChoose")}
                </button> */}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}