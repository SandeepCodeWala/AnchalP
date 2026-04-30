import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/utils/cn";

type LinkCardProps = {
  href: string;
  title: string;
  subtitle: string;
  icon: string;
  tint: "accent" | "gold" | "violet";
};

function LinkCard({ href, title, subtitle, icon, tint }: LinkCardProps) {
  const reduceMotion = useReducedMotion();

  const glow =
    tint === "accent"
      ? "bg-accent/12"
      : tint === "gold"
        ? "bg-gold/12"
        : "bg-violet-600/14";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      className={cn(
        "group glass relative overflow-hidden rounded-3xl p-6 ring-1 ring-black/10 transition dark:ring-white/10"
      )}
    >
      <div className={cn("absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl", glow)} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="font-display text-2xl text-zinc-950 dark:text-white">
            {title}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-white/70">
            {subtitle}
          </p>
        </div>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-black/[0.03] text-xl text-gold/85 ring-1 ring-black/10 dark:bg-white/[0.03] dark:ring-white/10">
          <span className="relative z-10">{icon}</span>
        </div>
      </div>

      <div className="relative mt-5 inline-flex items-center gap-2 text-xs text-zinc-600 dark:text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {subtitle}
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-gold/10" />
        <div className="absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10 animate-shimmer" />
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const { lang, t } = useI18n();

  const links: LinkCardProps[] = [
    {
      href: profile.contact.whatsapp,
      title: t("contactWhatsApp"),
      subtitle: lang === "hi" ? "सीधा संदेश भेजें" : "Send a direct message",
      icon: "✆",
      tint: "accent"
    },
    {
      href: profile.contact.instagram,
      title: t("contactInstagram"),
      subtitle: lang === "hi" ? "अपडेट्स और रील्स देखें" : "Updates & reels",
      icon: "⌁",
      tint: "violet"
    },
    {
      href: profile.contact.facebook,
      title: t("contactFacebook"),
      subtitle: lang === "hi" ? "पेज पर जुड़ें" : "Follow the page",
      icon: "✶",
      tint: "gold"
    }
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker={t("contactKicker")}
          title={t("contactTitle")}
          subtitle={t("contactSubtitle")}
          align="center"
        />

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {links.map((l) => (
            <LinkCard key={l.title} {...l} />
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-zinc-600 dark:text-white/50">
          {t("contactNote")}
        </div>
      </Container>
    </section>
  );
}
