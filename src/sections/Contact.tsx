import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n";
import { MessageCircle } from "lucide-react"; // MessageCircle is still available

type LinkCardProps = {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

function LinkCard({ href, title, subtitle, icon }: LinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-white group-hover:text-zinc-950 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700 dark:group-hover:text-white">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-zinc-950 dark:text-white">{title}</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</span>
      </div>
    </a>
  );
}

export default function Contact() {
  const { lang, t } = useI18n();

  const links = [
    {
      href: profile.contact.whatsapp,
      title: t("contactWhatsApp"),
      subtitle: lang === "hi" ? "संदेश भेजें" : "Send a message",
      icon: <MessageCircle size={20} />,
    },
    {
      href: profile.contact.instagram,
      title: t("contactInstagram"),
      subtitle: lang === "hi" ? "अपडेट्स देखें" : "Follow for updates",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      href: profile.contact.facebook,
      title: t("contactFacebook"),
      subtitle: lang === "hi" ? "पेज पर जुड़ें" : "Join the community",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="py-12">
      <Container>
        <SectionHeading kicker={t("contactKicker")} title={t("contactTitle")} subtitle={t("contactSubtitle")} align="center" />
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-1 md:grid-cols-3">
          {links.map((link) => (
            <LinkCard key={link.title} {...link} />
          ))}
        </div>
      </Container>
    </section>
  );
}