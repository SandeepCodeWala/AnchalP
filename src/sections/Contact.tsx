import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/utils/cn";
import { MessageCircle } from "lucide-react"; // Import Lucide for WhatsApp

// Custom SVG Icons for Brands
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

type LinkCardProps = {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode; // Changed from string to ReactNode
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
      whileHover={reduceMotion ? undefined : { y: -4 }} // Slightly more lift for feedback
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={cn(
        "group glass relative overflow-hidden rounded-3xl p-6 ring-1 ring-black/10 transition-all duration-300 hover:shadow-xl dark:ring-white/10"
      )}
    >
      {/* Dynamic Glow Background */}
      <div className={cn("absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl", glow)} />
      
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-grow">
          <div className="font-display text-2xl font-medium text-zinc-950 dark:text-white">
            {title}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-white/70">
            {subtitle}
          </p>
        </div>

        {/* Icon Container */}
        <div className={cn(
          "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-black/[0.03] transition-colors group-hover:bg-white/10 ring-1 ring-black/10 dark:bg-white/[0.03] dark:ring-white/10",
          tint === "accent" && "text-green-500",
          tint === "violet" && "text-purple-500",
          tint === "gold" && "text-gold/85"
        )}>
          <span className="relative z-10">{icon}</span>
        </div>
      </div>

      <div className="relative mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-white/40">
        <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", 
          tint === "accent" ? "bg-accent" : tint === "violet" ? "bg-violet-500" : "bg-gold"
        )} />
        {tint === "accent" ? "Online Now" : "Follow Updates"}
      </div>

      {/* Hover Shimmer Effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-gold/5" />
        <div className="absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-black/5 to-transparent dark:via-white/5 animate-shimmer" />
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
      icon: <MessageCircle className="h-6 w-6" />,
      tint: "accent"
    },
    {
      href: profile.contact.instagram,
      title: t("contactInstagram"),
      subtitle: lang === "hi" ? "अपडेट्स और रील्स देखें" : "Updates & reels",
      icon: <InstagramIcon />,
      tint: "violet"
    },
    {
      href: profile.contact.facebook,
      title: t("contactFacebook"),
      subtitle: lang === "hi" ? "पेज पर जुड़ें" : "Follow the page",
      icon: <FacebookIcon />,
      tint: "gold"
    }
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-4 sm:py-8">
      <Container>
        <SectionHeading
          kicker={t("contactKicker")}
          title={t("contactTitle")}
          subtitle={t("contactSubtitle")}
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {links.map((l) => (
            <LinkCard key={l.title} {...l} />
          ))}
        </div>

        {/* <div className="mt-10 text-center text-xs tracking-wide text-zinc-500 dark:text-white/40">
          {t("contactNote")}
        </div> */}
      </Container>
    </section>
  );
}