import Container from "@/components/Container";
import GlowButton from "@/components/GlowButton";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n";
import ProfileImage from "../data/profile.jpg";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white/50 p-3 text-center dark:border-white/10 dark:bg-white/[0.03]">
      <div className="font-display text-base font-semibold text-zinc-950 dark:text-white">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-widest text-zinc-500">{label}</div>
    </div>
  );
}

export default function About() {
  const { lang, t } = useI18n();

  return (
    <section id="about" className="scroll-mt-20 py-6 sm:py-10">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="glass overflow-hidden rounded-3xl ring-1 ring-black/10 dark:ring-white/10">
            <div className="grid sm:grid-cols-[200px,1fr]">

              {/* Photo column */}
              <div className="relative flex items-center justify-center bg-gradient-to-b from-accent/10 to-gold/10 p-6 sm:p-8">
                <div className="relative">
                  <img
                    src={ProfileImage}
                    alt="Anchal P"
                    className="h-36 w-28 rounded-2xl object-cover ring-4 ring-white/20 sm:h-44 sm:w-36"
                  />
                  <div className="absolute -right-1.5 -top-1.5 rounded-full bg-blue-500 p-1 ring-2 ring-white dark:ring-zinc-900">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content column */}
              <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-white/40">
                    {t("aboutKicker")}
                  </div>
                  <h2 className="mt-1 font-display text-2xl text-zinc-950 dark:text-white">
                    {t("aboutTitle")}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-white/65">
                    {t("aboutSubtitle")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <Stat label={t("statsExpertise")} value={profile.expertise[lang]} />
                  <Stat label={t("statsExperience")} value={profile.experience[lang]} />
                  <Stat label={t("statsLanguages")} value={profile.languages[lang]} />
                  <Stat label={t("statsRating")} value={`${profile.rating.value}★`} />
                </div>

                <GlowButton
                  className="self-start"
                  onClick={() => window.open(profile.platformUrl, "_blank")}
                >
                  {lang === "hi" ? "AstroSage पर देखें" : "View on AstroSage"}
                </GlowButton>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
